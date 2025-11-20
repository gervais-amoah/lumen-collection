// lib/ai/schemas/personalized-response-schema.ts
import { z } from "zod";

export const personalizedReplySchema = z.object({
  assistant_response: z
    .string()
    .describe("Reply to the user, referencing the recommended items."),

  highlighted_product_id: z
    .string()
    .nullable()
    .describe("ID of the product the assistant highlights, or null."),
});
