// lib/services/conversation-service.ts
import { getCachedResults, setCachedResults } from "@/lib/cache";
import { geminiClient } from "@/lib/ai/clients/gemini";
import { optimizeProductForAI } from "@/lib/utils";
import { semanticSearch } from "@/lib/vector-search";
import {
  ChatMessage,
  ConversationResult,
  PersonalizedReplyResult,
} from "@/types/chat";
import { Product } from "@/types/product";

export interface PersonalizationParams {
  userMessage: string;
  intent: string;
  embedding: number[];
  history: ChatMessage[];
  filters?: {
    category?: "footwear" | "accessory" | "clothing" | null;
    price_min?: number | null;
    price_max?: number | null;
    color?: string | null;
    occasion?: string | null;
  };
}

export class ConversationService {
  private readonly MAX_CONVERSATION_LENGTH = 15;

  async personalize(
    params: PersonalizationParams
  ): Promise<ConversationResult> {
    const { userMessage, intent, embedding, history, filters } = params;

    if (history.length >= this.MAX_CONVERSATION_LENGTH) {
      return this.handleConversationEnd(intent);
    }

    const search = await this.searchProducts(intent, embedding, filters);

    const personalizedReply = await this.generatePersonalizedResponse(
      userMessage,
      search.products,
      history
    );

    return {
      assistant_response: personalizedReply.assistant_response,
      highlighted_product_id: personalizedReply.highlighted_product_id,
      query_text: intent,
      products: search.products,
      cache_hit: search.cache_hit,
    };
  }

  private handleConversationEnd(intent: string): ConversationResult {
    const cachedProducts = getCachedResults(intent) || [];

    return {
      assistant_response:
        "We've explored quite a bit! To keep things fresh, consider reviewing the current selections or starting a new search later.",
      products: cachedProducts,
      cache_hit: false,
    };
  }

  private async searchProducts(
    intent: string,
    embedding: number[],
    filters?: PersonalizationParams["filters"]
  ): Promise<{ products: Product[]; cache_hit: boolean }> {
    const cached = getCachedResults(intent);
    if (cached) {
      return { products: cached, cache_hit: true };
    }

    // Now the search uses the embedding, not the intent string
    const products = await semanticSearch(embedding, filters);

    if (products.length > 0) {
      setCachedResults(intent, products);
    }

    return { products, cache_hit: false };
  }

  private async generatePersonalizedResponse(
    userMessage: string,
    products: Product[],
    history: ChatMessage[]
  ): Promise<PersonalizedReplyResult> {
    if (products.length === 0) {
      return {
        assistant_response:
          "I couldn't find any matching products. Could you try another description?",
        highlighted_product_id: null,
      };
    }

    const optimizedProducts = optimizeProductForAI(products);

    return await geminiClient.generatePersonalizedReply(
      userMessage,
      optimizedProducts,
      history
    );
  }
}
