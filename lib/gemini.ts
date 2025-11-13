// lib/gemini.ts
import { GoogleGenAI } from "@google/genai";
import { OptimizedProduct } from "@/types/product";
import {
  ChatMessage,
  PersonalizedReplyResult,
  SearchIntentResult,
} from "@/types/chat";

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

  // ---- 1️⃣ Extract Search Intent ----
  async getSearchIntent(
    userMessage: string,
    previousQueryText: string
  ): Promise<SearchIntentResult> {
    const prompt = `
You are a boutique shopping assistant. Your ONLY job is to understand the shopper’s intent and extract a searchable fashion query.

USER MESSAGE: "${userMessage}"
PREVIOUS SEARCH QUERY TEXT: ${previousQueryText || "none"}

RULES:
1. **On-Topic & Searchable**: If the message contains specific fashion attributes (colors, styles, types, occasions, budgets) OR refines a previous search → extract accurate search query.
2. **On-Topic but Vague**: If it's shopping-related but lacks details → return empty query_text and ask ONE clarifying question.
3. **Off-Topic**: If unrelated → return empty query_text and politely redirect.

EXAMPLES:
- "I need a black dress for a wedding"
  → {"query_text": "black formal dress for wedding", "assistant_response": ""}
- "Show me casual options under $100"
  → {"query_text": "casual dresses under 100 dollars", "assistant_response": ""}
- "What's the weather today?"
  → {"query_text": "", "assistant_response": "I’m not sure about the weather, but I can definitely help you find something stylish to wear!"}
- "I need a dress"
  → {"query_text": "", "assistant_response": "Of course! Is it for a casual day out or a special occasion?"}

Respond ONLY in JSON:
{
  "assistant_response": "Your reply here",
  "query_text": "search query or empty string"
}
`;

    try {
      const result = await this.generate(prompt);
      return JSON.parse(result) as SearchIntentResult;
    } catch (error) {
      console.error("Gemini getSearchIntent Error:", error);
      return { assistant_response: "", query_text: "" };
    }
  }

  // ---- 2️⃣ Generate Personalized Reply ----
  async generatePersonalizedReply(
    userMessage: string,
    products: OptimizedProduct[],
    chatHistory: ChatMessage[]
  ): Promise<PersonalizedReplyResult> {
    const prompt = `
You are a personal fashion stylist. The user asked: "${userMessage}"

Here are the matching products:
${JSON.stringify(products, null, 2)}

Analyze the user's message and respond accordingly:

**IF** refining filters (price, color, style, etc.):
- Choose ONE product that best fits
- Explain why it matches
- Return product ID in highlighted_product_id
- End with a light nudge toward purchase

**ELSE** (general query):
- Give brief styling advice for 1–2 products
- Return null for highlighted_product_id
- End with "Want to narrow down those options to find the perfect match?"

PREVIOUS CONTEXT: ${JSON.stringify(chatHistory.slice(-3)) || "none"}

Respond ONLY in JSON:
{
  "assistant_response": "Your reply here", 
  "highlighted_product_id": "product-id-123" or null
}
`;

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
