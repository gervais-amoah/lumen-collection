import { OptimizedProduct, Product } from "@/types/product";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function optimizeProductForAI(products: Product[]): OptimizedProduct[] {
  return products.map((product) => ({
    id: product.id,
    name: product.name,
    price: product.price,
    color: product.color,
    style: product.style,
    material: product.material,
    occasion: product.occasion,
    description: product.description, // Keep but truncate if needed
  }));
}
