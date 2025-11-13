// Conversation history type
export interface ChatHistory {
  role: string; // e.g. "user" | "assistant" | "system"
  content: string;
}

export interface SearchIntentResult {
  assistant_response: string;
  query_text: string;
}

export interface PersonalizedReplyResult {
  assistant_response: string;
  highlighted_product_id: string | null;
}

export interface ChatMessage {
  role: string;
  content: string;
}
