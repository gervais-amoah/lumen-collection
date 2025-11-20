// lib/vector-search.ts
import { createClient } from "@supabase/supabase-js";
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

    // if (filters.category) {
    //   products = products.filter(p => p.category === filters.category);
    // }
    // if (filters.price_max !== undefined) {
    //   products = products.filter(p => p.price <= filters.price_max);
    // }
    // if (filters.price_min !== undefined) {
    //   products = products.filter(p => p.price >= filters.price_min);
    // }
    // if (filters.color) {
    //   products = products.filter(p => p.color?.toLowerCase() === filters.color.toLowerCase());
    // }

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
