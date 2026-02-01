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

export async function fetchRelatedProducts(productId: string) {
  // First get the current product to find its related_items
  const product = await fetchProductDetails(productId);

  // If no related items, return empty array
  if (!product.related_items) return [];

  // Extract related item IDs
  const relatedIds = [
    ...(product.related_items.shoes || []),
    ...(product.related_items.accessories || []),
    ...(product.related_items.similar || []),
  ].slice(0, 3); // Limit to 3 items

  // Fetch those products
  const relatedProducts = await Promise.all(
    relatedIds.map((id) => fetchProductDetails(id)),
  );

  return relatedProducts.filter((p) => p !== null);
}
