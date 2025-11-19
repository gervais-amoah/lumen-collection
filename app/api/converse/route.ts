// app/api/converse/route.ts
import { rateLimit } from "@/lib/rate-limit";
import { ConversationService } from "@/lib/services/conversation-service";
import { NextRequest } from "next/server";
import { z } from "zod";

const ConverseSchema = z.object({
  userMessage: z.string().min(1).max(500),
  intent: z.string().min(1).max(200),
  embedding: z.array(z.number()).length(384),
  history: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string(),
      })
    )
    .max(15)
    .default([]),
});

export async function POST(req: NextRequest) {
  const rate = await rateLimit.check(req);
  if (!rate.success) {
    return Response.json({ error: "Too many requests" }, { status: 429 });
  }

  const body = ConverseSchema.parse(await req.json());

  const service = new ConversationService();
  const result = await service.personalize(body);

  return Response.json(result);
}
