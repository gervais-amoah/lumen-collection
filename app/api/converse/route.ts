// app/api/converse/route.ts
import { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getLumenResponse } from "@/lib/gemini";
import { getCachedResults, setCachedResults } from "@/lib/cache";
import { Product } from "@/types/product";
import { semanticSearch } from "@/lib/vector-search";

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const { message, history } = await req.json();

    // Step 1: Get Gemini response with intent analysis
    // const { assistant_response, query_text } = await getLumenResponse(
    //   message,
    //   history
    // );
    // TODO: For demonstration, we will use mock data
    const mock_assistant_response = "Do you see anything you like?";
    const mock_query_text = "red dress for wedding";

    let products: Product[] = [];
    let cache_hit = false;

    // Step 2: Perform search if we have a query
    if (mock_query_text && mock_query_text.trim().length > 0) {
      const normalizedQuery = mock_query_text.trim().toLowerCase();

      // Check cache first
      const cachedProducts = getCachedResults(normalizedQuery);

      if (cachedProducts) {
        products = cachedProducts;
        cache_hit = true;
        console.log("Cache hit for query:", normalizedQuery);
      } else {
        // Perform vector search
        products = await semanticSearch(normalizedQuery);

        // Cache the results
        if (products.length > 0) {
          setCachedResults(normalizedQuery, products);
        }
      }
    }

    return Response.json({
      assistant_response: mock_assistant_response,
      query_text: mock_query_text,
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
