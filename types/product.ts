export interface Product {
  id: string;
  category: string;
  type: string;
  name: string;
  brand: string;
  price: number;
  color: string[];
  size: string[];
  style: string[];
  material: string;
  occasion: string[];
  description: string;
  image_url: string;
  similarity?: number; // Added by vector search
}

export interface OptimizedProduct {
  id: string;
  name: string;
  price: number;
  color: string[];
  style: string[];
  material: string;
  occasion: string[];
  description: string;
}

export interface CachedResults {
  products: Product[];
  timestamp: number;
}

// For the frontend cart functionality
export interface CartItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

// For Algolia search results
export interface AlgoliaProduct {
  // Fields accessed in your JSX:
  name: string;
  price: number; // Or string if your data has currency symbols like "$100"
  image_url?: string; // Optional because you handle the "missing image" case
  url: string;
  material?: string; // Optional because you render it conditionally `{item.material && ...}`

  // Algolia System Field (Required):
  objectID: string;
}
