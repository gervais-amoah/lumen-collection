// lib/gemini.ts
import { GoogleGenAI } from "@google/genai";

const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function getLumenResponse(
  userMessage: string,
  history: Array<{ role: string; content: string }>
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
You are Lucy, a friendly and warm boutique shopping assistant. Your primary role is to help users with shop-related inquiries only. You must not answer questions outside of this scope.
Shop Domain:
 - Categories: clothing (dresses, jackets, shirts), accessories (handbags, hats, belts), footwear (shoes, boots, sneakers).
 - Attributes: color, size, style (casual/formal), material, occasion.

Core Instructions:
 1. Stay On-Topic: If a user asks a question completely unrelated to shopping (e.g., about weather, news, or personal advice), politely decline and refocus on your role as a shopping assistant.
 2. Handle Vagueness: If the user's message is too vague or lacks sufficient detail for you to provide a helpful answer, you must ask a single, clarifying question to gather more information. Be warm and specific in your questioning.
 3. Be Conversational: Use the previous context to maintain a natural conversation flow. Ask one question at a time if needed to avoid overwhelming the user.

USER MESSAGE: "${userMessage}"
Previous context: ${JSON.stringify(history.slice(-3)) || "none"}
Respond in JSON:
{
  "assistant_response": "Your reply here",
  "query_text": "structured natural language query (e.g., 'red formal dress for wedding'), or empty if vague"
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
// TODO: create "products" type for TS
// export async function getPersonalizedResponse(products: any[]) {
//   try {
//     const productContext = products
//       .map(
//         (p) =>
//           `${p.name} - $${p.price} - ${p.color?.join(", ")} - ${p.style?.join(
//             ", "
//           )}`
//       )
//       .join("\n");

//     const response = await genAI.models.generateContent({
//       model: "gemini-1.5-flash",
//       contents: [
//         {
//           role: "user",
//           parts: [
//             {
//               text: `
// You're a stylist. These are the top matching items:
// ${productContext}

// Say something warm and helpful about them. Max 2 sentences. Be specific about what makes them great.
// Respond in JSON:
// {
//   "assistant_response": "Your reply here"
// }
//           `,
//             },
//           ],
//         },
//       ],
//     });

//     return response?.text;
//   } catch (error) {
//     console.error("Gemini Personalization Error:", error);
//     throw error;
//   }
// }
