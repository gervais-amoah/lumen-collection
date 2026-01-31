// /lib/get-products
import { supabase } from "./supabase";

// const LEGACY_PRODUCTS_KEY = "products";
const AGENT_PRODUCTS_KEY = "agent_assisted_products";

export async function fetchProducts(filters: {
  category?: string;
  type?: string;
  color?: string;
  limit?: number;
}) {
  let query = supabase.from(AGENT_PRODUCTS_KEY).select("*");

  if (filters.category) query = query.eq("category", filters.category);
  if (filters.type) query = query.eq("type", filters.type);
  if (filters.color) query = query.contains("color", [filters.color]);
  if (filters.limit) query = query.limit(filters.limit);

  const { data, error } = await query;

  if (error) throw new Error(error.message);
  return data;
}

export async function fetchProductDetails(productId: string) {
  const { data, error } = await supabase
    .from(AGENT_PRODUCTS_KEY)
    .select("*")
    .eq("id", productId)
    .single();

  if (error) throw new Error(error.message);
  return data;
}
