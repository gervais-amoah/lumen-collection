// hooks/use-assistant.ts

import { useState } from "react";
// Assuming this path for client-side embedding
import { ChatMessage } from "@/types/chat";
import { Product } from "@/types/product";

// Conservative limit constants defined here for easy consumption by the component
export const MAX_MESSAGE_LENGTH = 200;
export const MAX_MESSAGES_PER_SESSION = 15;

export function useAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  // const [isLoading, setIsLoading] = useState(false);
  const [isUnderstandingIntent, setIsUnderstandingIntent] = useState(false);
  const [isFetchingRecommendations, setIsFetchingRecommendations] =
    useState(false);
  const isLoading = isUnderstandingIntent || isFetchingRecommendations;

  const [previousIntent, setPreviousIntent] = useState<string>("");
  // Separate state for the user's message input
  const [currentInput, setCurrentInput] = useState("");

  // Function to handle the full conversation flow
  const sendMessage = async (
    userMessage: string
  ): Promise<{ products: Product[]; highlightedId?: string } | undefined> => {
    if (!userMessage.trim() || isLoading) return;

    // Add user message immediately
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsUnderstandingIntent(true);
    setCurrentInput(""); // Clear input when sending

    try {
      // 1️⃣ Get intent
      const intentRes = await fetch("/api/intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Pass full history to /api/intent for context-aware intent extraction
        // TODO: Should send the previous intents as well
        body: JSON.stringify({
          userMessage,
          history: messages,
          previousIntent,
        }),
      });
      const intentData = await intentRes.json();
      // log the extracted intent
      console.log(
        "1. Log intent result (from frontend useAssitant hook):\n",
        intentData
      );

      if (!intentData.intent) {
        // Show clarification message
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: intentData.assistant_response },
        ]);
        return { products: [] };
      }

      setPreviousIntent(intentData.intent);
      setIsUnderstandingIntent(false);
      setIsFetchingRecommendations(true);
      const filters = intentData.filters || {};

      // 2️⃣ Embed intent (client-side)
      // const embedding = await embedText(intentData.intent);
      const res = await fetch("/api/embeddings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: intentData.intent }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to fetch embedding");
      }

      const data: { embedding: number[] } = await res.json();
      const embedding = data.embedding;

      // 3️⃣ Send to converse
      // Send the most current history (including the last user message)
      const currentHistory = [
        ...messages,
        { role: "user", content: userMessage },
      ];

      const converseRes = await fetch("/api/converse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userMessage,
          intent: intentData.intent,
          history: currentHistory, // Send the full, updated history
          embedding, // Renamed from 'embedding' for consistency
          filters,
        }),
      });
      const converseData = await converseRes.json();

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: converseData.assistant_response },
      ]);
      setIsFetchingRecommendations(false);

      // Return products and highlighted ID for external state management (e.g., Zustand store)
      return {
        products: (converseData.products || []) as Product[],
        highlightedId: converseData.highlighted_product_id, // Assuming this might be returned
      };
    } catch (err) {
      console.error("Assistant error:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Oops! Something went wrong. Please check the console for details.",
        },
      ]);
      return { products: [] };
    } finally {
      setIsUnderstandingIntent(false);
      setIsFetchingRecommendations(false);
    }
  };

  return {
    messages,
    sendMessage,
    isLoading,
    isUnderstandingIntent,
    isFetchingRecommendations,
    currentInput,
    setCurrentInput,
    messagesRemaining: MAX_MESSAGES_PER_SESSION - messages.length,
  };
}
