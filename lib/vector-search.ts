// lib/vector-search.ts
import { createClient } from "@supabase/supabase-js";
import { embeddingService } from "./embeddings";
import { Product } from "@/types/product";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function semanticSearch(
  query: string,
  limit: number = 6
): Promise<Product[]> {
  try {
    // Generate embedding for the query - MOCK FOR NOW
    // const embedding = await embeddingService.generateEmbeddingMock(query);
    const embedding = await embeddingService.generateEmbedding(query);

    // Search Supabase using vector similarity
    const { data: products, error } = await supabase.rpc("match_products", {
      query_embedding: embedding,
      match_threshold: 0.3, // Start with lower threshold for testing
      match_count: limit,
    });

    if (error) {
      console.error("Supabase RPC error:", error);
      throw error;
    }

    // remove

    console.log(`Found ${products?.length || 0} products`);
    return products || [];
  } catch (error) {
    console.error("Vector search error:", error);
    return [];
  }
}
