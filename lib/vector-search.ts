// lib/vector-search.ts
import { createClient } from "@supabase/supabase-js";
import { Product } from "@/types/product";
import { PersonalizationParams } from "./services/conversation-service";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

type MatchProductsResponse = {
  data: Product[];
  error: {
    message: string;
    code?: string;
    details?: string;
  } | null;
  status: number;
  statusText: string;
};

export async function semanticSearch(
  embedding: number[],
  filters?: PersonalizationParams["filters"],
  limit: number = 6
): Promise<Product[]> {
  try {
    // Search Supabase using vector similarity
    const { data: products, error } = (await supabase.rpc("match_products", {
      query_embedding: embedding,
      match_threshold: 0.3, // Start with lower threshold for testing
      match_count: limit,
    })) as MatchProductsResponse;

    if (error) {
      console.error("Supabase RPC error:", error);
      throw error;
    }

    let filteredProducts = products;
    if (filters && products?.length > 0) {
      if (filters.category) {
        filteredProducts = filteredProducts.filter(
          (p) => p.category === filters.category
        );
      }
      if (filters.price_max) {
        filteredProducts = filteredProducts.filter(
          (p) => p.price <= filters.price_max!
        );
      }
      if (filters.price_min) {
        filteredProducts = filteredProducts.filter(
          (p) => p.price >= filters.price_min!
        );
      }
    }

    return filteredProducts || [];
  } catch (error) {
    console.error("Vector search error:", error);
    return [];
  }
}
