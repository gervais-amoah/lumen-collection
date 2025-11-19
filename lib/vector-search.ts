// lib/vector-search.ts
import { createClient } from "@supabase/supabase-js";
// import { embeddingService } from "./embeddings"; // TODO: delete this file if unused
import { Product } from "@/types/product";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function semanticSearch(
  embedding: number[],
  limit: number = 6
): Promise<Product[]> {
  try {
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

    console.log(`Found ${products?.length || 0} products`);
    return products || [];
  } catch (error) {
    console.error("Vector search error:", error);
    return [];
  }
}
