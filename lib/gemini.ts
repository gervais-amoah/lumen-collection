// lib/gemini.ts
import { OptimizedProduct } from "@/types/product";
import { GoogleGenAI } from "@google/genai";

const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

// TODO: Type functions' outputs
// TODO: Make this a class

export async function getSearchIntent(
  userMessage: string,
  previousQueryText: string
) {
  try {
    const response = await genAI.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `
You are boutique shopping assistant. Your ONLY job is to understand the shopper’s intent and extract a searchable fashion query.

USER MESSAGE: "${userMessage}"
PREVIOUS SEARCH QUERY TEXT: ${previousQueryText || "none"}

RULES:
1. **On-Topic & Searchable**: If the message contains specific fashion attributes (colors, styles, types, occasions, budgets) OR is refining/narrowing a previous search → extract accurate search query
2. **On-Topic but Vague**: If it's shopping-related but lacks any specific attributes → return empty query_text and ask ONE clarifying question
3. **Off-Topic**: If completely unrelated → return empty query_text and politely redirect

EXAMPLES:
- User: "I need a black dress for a wedding"
  → {"query_text": "black formal dress for wedding", "assistant_response": ""}

- User: "Show me some casual options under $100"
  → {"query_text": "casual dresses under 100 dollars", "assistant_response": ""}

- User: "What's the weather today?"
  → {"query_text": "", "assistant_response": "I’m not sure about the weather, but I can definitely help you find something stylish to wear!"}

- User: "I need a dress"
  → {"query_text": "", "assistant_response": "Of course! Is it for a casual day out or a special occasion?"}


Respond ONLY in this JSON format:
{
  "assistant_response": "Your reply here",
  "query_text": "search query or empty string"
}
          `,
            },
          ],
        },
      ],
      config: {
        thinkingConfig: {
          thinkingBudget: 0,
        },
      },
    });

    let rawText = response?.text;

    if (!rawText) {
      return JSON.parse(rawText || "{}");
    }

    // ✅ CLEAN THE RESPONSE: Remove ```json ... ``` wrapper if present
    rawText = rawText
      .trim()
      .replace(/^```json\s*/, "") // Remove ```json at start
      .replace(/```$/, ""); // Remove ``` at end

    // ✅ Parse cleaned JSON
    return JSON.parse(rawText);
  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
}

// Generate personalized response based on products
export async function generatePersonalizedReply(
  userMessage: string,
  products: OptimizedProduct[], // Use your Product type here
  chatHistory: Array<{ role: string; content: string }>
): Promise<string> {
  const prompt = `
You are a personal fashion stylist. The user asked: "${userMessage}"

Here are the matching products:
${JSON.stringify(products, null, 2)}

Analyze the user's message and respond accordingly:

**IF** the user is adding filters/narrowing criteria (like specific price, style, color, or occasion preferences):
- Choose ONE product that best matches their refined request
- Explain why it's a great fit for their specific needs
- Acknowledge if it's not a perfect match but captures the "vibe"
- Return the product ID in highlighted_product_id
- **IMPORTANT**: End with a gentle nudge toward action, like "This would look great on you!"

**ELSE** (general query without specific constraints):
- Give warm, general styling advice about 1-2 products  
- Mention how these could work for their needs
- Return null for highlighted_product_id
- **End with: "Want to narrow down those options to find the perfect match?"**

**ALWAYS:**
- Keep response to 2-3 sentences max
- Be natural and helpful, not pushy

PREVIOUS CONTEXT: ${JSON.stringify(chatHistory.slice(-3)) || "none"}

Respond in JSON:
{
  "assistant_response": "Your reply here", 
  "highlighted_product_id": "product-id-123" or null
}

`;

  try {
    const response = await genAI.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    return response.text || "Here are some options that might work for you!";
  } catch (error) {
    console.error("Personalization error:", error);
    return "I found some great options for you! What do you think?";
  }
}
