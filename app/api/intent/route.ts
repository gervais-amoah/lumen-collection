// app/api/intent/route.ts
import { IntentService } from "@/lib/services/intent-service";
import { NextRequest } from "next/server";
import { z } from "zod";

const IntentSchema = z.object({
  userMessage: z.string().min(1).max(500),
  previousQueryText: z.string().optional().default(""),
});

export async function POST(req: NextRequest) {
  const body = IntentSchema.parse(await req.json());

  const intentService = new IntentService();
  const result = await intentService.extractIntent(
    body.userMessage,
    body.previousQueryText
  );

  return Response.json(result);
}
