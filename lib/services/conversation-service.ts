// lib/services/conversation-service.ts
import { getCachedResults, setCachedResults } from "@/lib/cache";
import { geminiClient } from "@/lib/gemini";
import { optimizeProductForAI } from "@/lib/utils";
import { semanticSearch } from "@/lib/vector-search";
import { ChatMessage, PersonalizedReplyResult } from "@/types/chat";
import { Product } from "@/types/product";

interface ProcessMessageParams {
  userMessage: string;
  previousQueryText: string;
  history: ChatMessage[];
}

interface ConversationResult {
  assistant_response: string;
  highlighted_product_id?: string | null;
  products: Product[];
  query_text?: string;
  cache_hit: boolean;
  error?: boolean;
}

export class ConversationService {
  private readonly MAX_CONVERSATION_LENGTH = 10;

  async processMessage(
    params: ProcessMessageParams
  ): Promise<ConversationResult> {
    const { userMessage, previousQueryText, history } = params;

    // Check conversation limits
    if (this.isConversationTooLong(history)) {
      return this.handleConversationEnd(previousQueryText);
    }

    // Analyze user intent
    const intentResult = await this.getUserIntent(
      userMessage,
      previousQueryText
    );

    if (this.shouldReturnEarly(intentResult)) {
      return {
        assistant_response: intentResult.assistant_response,
        products: [],
        cache_hit: false,
      };
    }

    // Search for products
    const searchResult = await this.searchProducts(intentResult.query_text);

    // Generate personalized response
    const personalizedReply = await this.generatePersonalizedResponse(
      userMessage,
      searchResult.products,
      history
    );

    return {
      assistant_response: personalizedReply.assistant_response,
      highlighted_product_id: personalizedReply.highlighted_product_id,
      query_text: intentResult.query_text,
      products: searchResult.products,
      cache_hit: searchResult.cache_hit,
    };
  }

  private isConversationTooLong(history: ChatMessage[]): boolean {
    const isTooLong = history.length >= this.MAX_CONVERSATION_LENGTH;
    console.log(
      "Conversation history length:",
      history.length,
      "Too long:",
      isTooLong
    );
    return isTooLong;
  }

  private handleConversationEnd(previousQueryText: string): ConversationResult {
    const normalizedQuery = previousQueryText.trim().toLowerCase();
    const cachedProducts = getCachedResults(normalizedQuery) || [];

    return {
      assistant_response:
        "It seems we've explored quite a bit! To keep things fresh, how about considering the current selections or starting a new search later? I have to check our inventory now. Happy shopping!",
      products: cachedProducts,
      cache_hit: false,
    };
  }

  private async getUserIntent(userMessage: string, previousQueryText: string) {
    console.log("Analyzing for user intent...");
    const result = await geminiClient.getSearchIntent(
      userMessage,
      previousQueryText
    );

    console.log("Gemini intent response:", result);
    return result;
  }

  private shouldReturnEarly(intentResult: {
    assistant_response: string;
    query_text: string;
  }): boolean {
    return Boolean(
      intentResult.assistant_response &&
        (!intentResult.query_text ||
          intentResult.query_text.trim().length === 0)
    );
  }

  private async searchProducts(
    queryText: string
  ): Promise<{ products: Product[]; cache_hit: boolean }> {
    const normalizedQuery = queryText.trim().toLowerCase();

    // Check cache first
    const cachedProducts = getCachedResults(normalizedQuery);
    if (cachedProducts) {
      console.log("Cache hit for query:", normalizedQuery);
      return { products: cachedProducts, cache_hit: true };
    }

    // Perform vector search
    const products = await semanticSearch(normalizedQuery);

    // Cache results if we found any
    if (products.length > 0) {
      setCachedResults(normalizedQuery, products);
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
          "I couldn't find any products matching your request. Could you try different search terms?",
        highlighted_product_id: null,
      };
    }

    const optimizedProducts = optimizeProductForAI(products);
    const reply = await geminiClient.generatePersonalizedReply(
      userMessage,
      optimizedProducts,
      history
    );

    console.log("Personalized reply:", reply);
    console.log("Products returned:", optimizedProducts.length);

    return reply;
  }
}
