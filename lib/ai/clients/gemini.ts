// lib/ai/clients/gemini.ts
import {
  getPersonalizedReplyPrompt,
  getSearchIntentPrompt,
} from "@/lib/ai/prompts";
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
    try {
      const response = await this.genAI.models.generateContent({
        model: this.model,
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        config: { thinkingConfig: { thinkingBudget: 0 } },
      });
      const rawText = response?.text?.trim() ?? "";
      return this.cleanJSONResponse(rawText);
    } catch (error) {
      console.error("Gemini generate Error:", error);
      throw error;
    }
  }

  private cleanJSONResponse(rawText: string): string {
    return rawText
      .replace(/^```json\s*/, "")
      .replace(/```$/, "")
      .trim();
  }

  async getSearchIntent(
    userMessage: string,
    previousQueryText: string,
    history: { role: "user" | "assistant"; content: string }[]
  ): Promise<SearchIntentResult> {
    const formatedHistory = history
      .map(
        (msg) =>
          `${msg.role === "user" ? "USER" : "ASSISTANT"} MESSAGE: "${
            msg.content
          }"`
      )
      .join("\n");
    //  Structure the output, no need to have it in prompt examples
    // https://ai.google.dev/gemini-api/docs/structured-output?hl=fr&example=recipe
    const prompt = getSearchIntentPrompt(
      userMessage,
      previousQueryText,
      formatedHistory
    );

    /*
Hello. I'm looking for a nice dress i can wear for my brother's wedding. Something elegant

What about something more formal?

    */

    try {
      const result = await this.generate(prompt);
      return JSON.parse(result) as SearchIntentResult;
    } catch (error) {
      console.error("Gemini getSearchIntent Error:", error);
      return {
        intent: "",
        assistant_response: "Sorry, I'm having trouble understanding you.",
        filters: { category: null },
      };
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
