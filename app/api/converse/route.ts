// app/api/converse/route.ts
import { getCachedResults, setCachedResults } from "@/lib/cache";
import { optimizeProductForAI } from "@/lib/utils";
import { semanticSearch } from "@/lib/vector-search";
import { ChatHistory } from "@/types/chat";
import { Product } from "@/types/product";
import { NextRequest } from "next/server";

import { geminiClient } from "@/lib/gemini";

export async function POST(req: NextRequest) {
  try {
    // TODO: For more context, we could receive the previous suggestions products shown
    const {
      userMessage,
      previousQueryText,
      history,
    }: {
      userMessage: string;
      previousQueryText: string;
      history: ChatHistory[];
    } = await req.json();

    // if history is too long, end conversation nicely, and asking user to consider current products or start a new search a bit later
    const endConversation = history.length >= 10;
    console.log("\n\nConversation history length:", history.length);
    if (endConversation) {
      // get current product suggestions based on last query
      const normalizedQuery = previousQueryText.trim().toLowerCase();
      const cachedProducts = getCachedResults(normalizedQuery);

      return Response.json({
        assistant_response:
          "It seems we've explored quite a bit! To keep things fresh, how about considering the current selections or starting a new search later? I have to check our inventory now. Happy shopping!",
        products: cachedProducts || [],
        cache_hit: false,
      });
    }

    // Destructure Gemini client methods
    const { getSearchIntent, generatePersonalizedReply } = geminiClient;

    // Step 1: Get Gemini response with intent analysis
    const { assistant_response, query_text } = await getSearchIntent(
      userMessage,
      previousQueryText
    );

    console.log("\n\nGemini intent response:\n", {
      assistant_response,
      query_text,
    });

    if (assistant_response && (!query_text || query_text.trim().length === 0)) {
      // Off-topic or vague response, return early
      return Response.json({
        assistant_response: assistant_response,
        products: [],
        cache_hit: false,
      });
    }

    let products: Product[] = [];
    let cache_hit = false;

    // Step 2: Perform search if we have a query

    // Check cache first
    const normalizedQuery = query_text.trim().toLowerCase();
    const cachedProducts = getCachedResults(normalizedQuery);

    if (cachedProducts) {
      products = cachedProducts;
      cache_hit = true;
      console.log("\n\nCache hit for query:", normalizedQuery);
    } else {
      // Perform vector search
      products = await semanticSearch(normalizedQuery);

      // Cache the results
      if (products.length > 0) {
        setCachedResults(normalizedQuery, products);
      }
    }

    // Step 3: Send products aback to AI for personalized response (optional)
    const optimizedProducts = optimizeProductForAI(products);
    const personalizedReply = await generatePersonalizedReply(
      userMessage,
      optimizedProducts,
      history
    );

    console.log("\n\nPersonalized reply:\n", personalizedReply);
    console.log("\n\nProducts returned:\n", optimizedProducts);

    // Final response
    return Response.json({
      assistant_response: personalizedReply,
      query_text,
      products,
      cache_hit,
    });
  } catch (error) {
    console.error("API Error:", error);
    return Response.json({
      assistant_response: "One moment — checking our inventory...",
      products: [],
      error: true,
    });
  }
}
