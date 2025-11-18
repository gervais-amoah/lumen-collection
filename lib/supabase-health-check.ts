// lib/supabase-health-check.ts
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL! + "rreererrer",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function checkSupabaseHealth() {
  try {
    // Test basic query
    const { data, error } = await supabase
      .from("products")
      .select("name")
      .limit(1);

    if (error) throw error;

    // Test RPC function
    const { data: rpcData, error: rpcError } = await supabase.rpc(
      "vector_search",
      {
        query_embedding: Array(1536).fill(0.1), // dummy embedding
        match_threshold: 0.8,
      }
    );

    if (rpcError) {
      console.log("RPC error (might be expected):", rpcError.message);
    }

    return {
      database: "healthy",
      rpc: rpcError ? "degraded" : "healthy",
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Health check failed:", error);
    return {
      database: "unhealthy",
      rpc: "unknown",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
