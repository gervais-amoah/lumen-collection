// lib/services/intent-service.ts
import { geminiClient } from "@/lib/ai/clients/gemini";

export interface IntentResult {
  intent: string; // "" when unclear
  assistant_response: string | null; // ask for clarification message
}

export class IntentService {
  async extractIntent(
    userMessage: string,
    previousQueryText = ""
  ): Promise<IntentResult> {
    const result = await geminiClient.getSearchIntent(
      userMessage,
      previousQueryText
    );

    const hasNoIntent =
      !result.query_text || result.query_text.trim().length === 0;

    return {
      intent: hasNoIntent ? "" : result.query_text.trim().toLowerCase(),
      assistant_response: hasNoIntent ? result.assistant_response : null,
    };
  }
}
