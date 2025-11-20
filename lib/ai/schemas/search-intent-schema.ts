// lib/ai/schemas/search-intent-schema.ts
import { z } from "zod";

export const searchIntentSchema = z.object({
  assistant_response: z
    .string()
    .describe("Natural language assistant reply to the user."),

  query_text: z
    .string()
    .describe("Extracted search query text or empty string."),

  filters: z
    .object({
      category: z
        .enum(["footwear", "accessory", "clothing"])
        .nullable()
        .describe("Predicted category, or null if unknown.")
        .optional(),

      price_min: z.number().optional(),
      price_max: z.number().optional(),
      color: z.string().optional(),
      occasion: z.string().optional(),
    })
    .partial()
    .describe("Search filters extracted from the user's request."),
});
