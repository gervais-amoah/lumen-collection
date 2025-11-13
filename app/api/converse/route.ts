// app/api/converse/route.ts
import { NextRequest } from "next/server";
import { z } from "zod";
import { ConversationService } from "@/lib/services/conversation-service";
import { rateLimit } from "@/lib/rate-limit";

// Input validation schema
const ConverseRequestSchema = z.object({
  userMessage: z.string().min(1).max(500),
  previousQueryText: z.string().max(200).optional().default(""),
  history: z
    .array(
      z.object({
        role: z.string(),
        content: z.string(),
      })
    )
    .max(10)
    .default([]),
});

export async function POST(req: NextRequest) {
  try {
    const rateLimitResult = await rateLimit.check(req);
    if (!rateLimitResult.success) {
      return Response.json({ error: "Too many requests" }, { status: 429 });
    }

    // Validate input
    const rawBody = await req.json();
    const validationResult = ConverseRequestSchema.safeParse(rawBody);

    if (!validationResult.success) {
      return Response.json(
        {
          error: "Invalid request data",
          details: validationResult.error.issues,
        },
        { status: 400 }
      );
    }

    const { userMessage, previousQueryText, history } = validationResult.data;

    // Use service layer for business logic
    const conversationService = new ConversationService();
    const result = await conversationService.processMessage({
      userMessage,
      previousQueryText,
      history,
    });

    return Response.json(result);
  } catch (error) {
    console.error("API Error:", error);

    // Don't expose internal errors to clients
    return Response.json(
      {
        assistant_response:
          "I'm having trouble processing your request. Please try again in a moment.",
        products: [],
        error: true,
      },
      { status: 500 }
    );
  }
}
