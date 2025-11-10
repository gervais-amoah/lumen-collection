import { Product, CachedResults } from "@/types/product";

const cache = new Map<string, CachedResults>();
const TTL = 60 * 60 * 1000; // 1 hour

export function getCachedResults(query: string): Product[] | null {
  const normalizedQuery = query.trim().toLowerCase();
  const cached = cache.get(normalizedQuery);

  if (cached && Date.now() - cached.timestamp < TTL) {
    return cached.products;
  }

  return null;
}

export function setCachedResults(query: string, products: Product[]): void {
  const normalizedQuery = query.trim().toLowerCase();
  cache.set(normalizedQuery, {
    products,
    timestamp: Date.now(),
  });
}

// Optional: Clean up old entries periodically
export function cleanupCache(): void {
  const now = Date.now();
  for (const [key, value] of cache.entries()) {
    if (now - value.timestamp > TTL) {
      cache.delete(key);
    }
  }
}
