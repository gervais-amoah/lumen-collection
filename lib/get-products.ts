// /lib/get-products
import { supabase } from "./supabase";

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

export async function fetchProductDetails(productId: string) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", productId)
    .single();

  if (error) throw new Error(error.message);
  return data;
}
