// lib/services/intent-service.ts
import { geminiClient } from "@/lib/ai/clients/gemini";
import { SearchIntentResult } from "@/types/chat";

export class IntentService {
  async extractIntent(
    userMessage: string,
    previousQueryText = "",
    history: { role: "user" | "assistant"; content: string }[] = []
  ): Promise<SearchIntentResult> {
    const result = await geminiClient.getSearchIntent(
      userMessage,
      previousQueryText,
      history
    );

    const hasNoIntent = !result.intent || result.intent.trim().length === 0;

    return {
      intent: hasNoIntent ? "" : result.intent.trim().toLowerCase(),
      assistant_response: hasNoIntent ? result.assistant_response : "",
      filters: result.filters,
    };
  }
}
