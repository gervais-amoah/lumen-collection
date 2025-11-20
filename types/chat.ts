import { Product } from "./product";

// Conversation history type
export interface SearchIntentResult {
  assistant_response: string;
  intent: string;
  filters: {
    category: "footwear" | "accessory" | "clothing" | null;
    price_min?: number;
    price_max?: number;
    color?: string;
    occasion?: string;
  };
}

export interface PersonalizedReplyResult {
  assistant_response: string;
  highlighted_product_id: string | null;
}

export interface ChatMessage {
  role: string; // e.g. "user" | "assistant" | "system"
  content: string;
}

export interface ProcessMessageParams {
  userMessage: string;
  previousQueryText: string;
  history: ChatMessage[];
}

export interface ConversationResult {
  assistant_response: string;
  highlighted_product_id?: string | null;
  products: Product[];
  query_text?: string;
  cache_hit: boolean;
  error?: boolean;
}
