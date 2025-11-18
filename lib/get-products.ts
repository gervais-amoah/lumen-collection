// /lib/products.ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!; // or service role key if needed
const supabase = createClient(supabaseUrl, supabaseKey);

export async function fetchProducts(filters: {
  category?: string;
  type?: string;
  color?: string;
  limit?: number;
}) {
  let query = supabase.from("products").select("*");

  if (filters.category) query = query.eq("category", filters.category);
  if (filters.type) query = query.eq("type", filters.type);
  if (filters.color) query = query.contains("color", [filters.color]);
  if (filters.limit) query = query.limit(filters.limit);

  const { data, error } = await query;

  if (error) throw new Error(error.message);
  return data;
}
