// lib/gemini.ts
import { getPersonalizedReplyPrompt, getSearchIntentPrompt } from "@/prompts";
import {
  ChatMessage,
  PersonalizedReplyResult,
  SearchIntentResult,
} from "@/types/chat";
import { OptimizedProduct } from "@/types/product";
import { GoogleGenAI } from "@google/genai";

// ---- Gemini Client ----
export class GeminiClient {
  private genAI: GoogleGenAI;
  private readonly model = "gemini-2.5-flash-lite";

  constructor(apiKey = process.env.GEMINI_API_KEY!) {
    if (!apiKey) throw new Error("Missing GEMINI_API_KEY");
    this.genAI = new GoogleGenAI({ apiKey });
  }

  private async generate(prompt: string): Promise<string> {
    const response = await this.genAI.models.generateContent({
      model: this.model,
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      config: { thinkingConfig: { thinkingBudget: 0 } },
    });

    const rawText = response?.text?.trim() ?? "";
    return this.cleanJSONResponse(rawText);
  }

  private cleanJSONResponse(rawText: string): string {
    return rawText
      .replace(/^```json\s*/, "")
      .replace(/```$/, "")
      .trim();
  }

  async getSearchIntent(
    userMessage: string,
    previousQueryText: string
  ): Promise<SearchIntentResult> {
    const prompt = getSearchIntentPrompt(userMessage, previousQueryText);

    try {
      const result = await this.generate(prompt);
      return JSON.parse(result) as SearchIntentResult;
    } catch (error) {
      console.error("Gemini getSearchIntent Error:", error);
      return { assistant_response: "", query_text: "" };
    }
  }

  async generatePersonalizedReply(
    userMessage: string,
    products: OptimizedProduct[],
    chatHistory: ChatMessage[]
  ): Promise<PersonalizedReplyResult> {
    const prompt = getPersonalizedReplyPrompt(
      userMessage,
      products,
      chatHistory
    );

    try {
      const result = await this.generate(prompt);
      return JSON.parse(result) as PersonalizedReplyResult;
    } catch (error) {
      console.error("Gemini personalization error:", error);
      return {
        assistant_response:
          "I found some great options for you! What do you think?",
        highlighted_product_id: null,
      };
    }
  }
}

// ---- Singleton export ----
export const geminiClient = new GeminiClient();
