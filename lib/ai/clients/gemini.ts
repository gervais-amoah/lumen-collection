// lib/ai/clients/gemini.ts
import {
  getPersonalizedReplyPrompt,
  getSearchIntentPrompt,
} from "@/lib/ai/prompts";
import {
  ChatMessage,
  GeminiFormattedMessage,
  PersonalizedReplyResult,
  SearchIntentResult,
} from "@/types/chat";
import { OptimizedProduct } from "@/types/product";
import { GenerateContentConfig, GoogleGenAI } from "@google/genai";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

// Define the filters schema
const filtersSchema = z.object({
  category: z.enum(["footwear", "accessory", "clothing"]).nullable(),
  price_min: z.number().nullable(),
  price_max: z.number().nullable(),
  color: z.string().nullable(),
  occasion: z.string().nullable(),
  style: z.string().nullable(),
  brand: z.string().nullable(),
});

// Define the complete response schema for Prompt 1
const intentResponseSchema = z.object({
  assistant_response: z
    .string()
    .describe("Your message to the user, or empty string if no message needed"),
  intent: z
    .string()
    .describe(
      "Natural language search query, or empty string if no search intent"
    ),
  filters: filtersSchema.describe(
    "Structured filters extracted from the user's message"
  ),
});

// Define the response schema for Prompt 2
const stylistResponseSchema = z.object({
  assistant_response: z
    .string()
    .describe("Your styling advice and recommendation to the user"),
  highlighted_product_id: z
    .string()
    .nullable()
    .describe(
      "The ID of the product being recommended, or null if providing general guidance"
    ),
});

// ---- Gemini Client ----

export class GeminiClient {
  private genAI: GoogleGenAI;
  private readonly model = "gemini-2.5-flash-lite"; // Do not use "gemini-2.5-flash-lite" for better performance

  constructor(apiKey = process.env.GEMINI_API_KEY!) {
    if (!apiKey) throw new Error("Missing GEMINI_API_KEY");
    this.genAI = new GoogleGenAI({ apiKey });
  }

  private async generate(
    systemInstruction: string,
    contents: GeminiFormattedMessage[]
  ): Promise<string> {
    try {
      const config: GenerateContentConfig = {
        // thinkingConfig: { thinkingBudget: 0 },
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
      };

      const response = await this.genAI.models.generateContent({
        model: this.model,
        contents: contents,
        config: config,
      });
      console.log(
        "\n\n***********\n\n",
        "Gemini raw response:\n",
        response,
        "\n\n***********\n\n"
      );

      const rawText = response?.text?.trim() ?? "";
      return this.cleanJSONResponse(rawText);
    } catch (error) {
      console.error("Gemini generate Error:", error);
      throw error;
    } finally {
      console.log(
        "*************\nContents to Gemini:\n",
        JSON.stringify(contents, null, 2)
      );
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
    history: ChatMessage[]
  ): Promise<SearchIntentResult> {
    const formatedHistory: GeminiFormattedMessage[] = history.map((msg) => ({
      role: msg.role === "assistant" ? "model" : "user", // NOTE: Assistant role must be 'model' for the API
      parts: [{ text: msg.content }],
    }));
    // Append user message as the last entry
    formatedHistory.push({
      role: "user",
      parts: [{ text: userMessage }],
    });
    //  Structure the output, no need to have it in prompt examples
    // https://ai.google.dev/gemini-api/docs/structured-output?hl=fr&example=recipe
    const systemPrompt = getSearchIntentPrompt(
      userMessage
      // previousQueryText,
      // formatedHistory
    );

    /*
Hello
Yes, I'm looking for a nice dress I can wear for my brother's wedding. Something elegant
What about something more formal? / It looks a bit formal too me




    */

    try {
      const result = await this.generate(systemPrompt, formatedHistory);
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
    const formatedHistory: GeminiFormattedMessage[] = chatHistory.map(
      (msg) => ({
        role: msg.role === "assistant" ? "model" : "user",
        parts: [{ text: msg.content }],
      })
    );

    const systemPrompt = getPersonalizedReplyPrompt(
      // userMessage
      products
      // formatedHistory
    );

    try {
      const result = await this.generate(systemPrompt, formatedHistory);
      console.log(
        "\n\n***********\n\n",
        "Gemini personalized cleaned result:\n",
        JSON.stringify(result, null, 2),
        "\n\n***********\n\n"
      );
      return JSON.parse(result) as PersonalizedReplyResult;
    } catch (error) {
      console.error("Gemini personalization error:", error);
      console.error("\n\n***********\n\n");
      // console.log("System Prompt:\n", systemPrompt);
      console.log("Chat History:\n", JSON.stringify(formatedHistory));
      console.log("\n\n***********\n\n");
      return {
        assistant_response:
          "Sorry, I'm having trouble generating a personalized response.",
        highlighted_product_id: null,
      };
    }
  }
}

// ---- Singleton export ----
export const geminiClient = new GeminiClient();
