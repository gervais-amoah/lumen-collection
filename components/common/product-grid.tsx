"use client";

import { ProductCard } from "@/components/common/product-card";
import { useProductStore } from "@/store/useProductStore";
import { Product } from "@/types/product";

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  const highlightedId = useProductStore((state) => state.highlightedProductId);

  // Move highlighted product to the top if it exists
  const sortedProducts = highlightedId
    ? [
        ...products.filter((p) => p.id === highlightedId),
        ...products.filter((p) => p.id !== highlightedId),
      ]
    : products;

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 overflow-auto h-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      {sortedProducts.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          index={index}
          highlighted={product.id === highlightedId}
        />
      ))}
    </div>
  );
}
