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

export interface CachedResults {
  products: Product[];
  timestamp: number;
}
