"use client";

import { useState } from "react";
import { Product } from "@/types/product";
import { ShoppingCart, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/useCartStore";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
  index: number;
}

export function ProductCard({ product, index }: ProductCardProps) {
  const [isAdded, setIsAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.image_url,
      quantity: 1,
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-lg border bg-card shadow-sm transition-all hover:shadow-md",
        // React Bits animation: stagger entrance
        "animate-in fade-in slide-in-from-bottom-4",
        "duration-500 fill-mode-both"
      )}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Product Image */}
      <div className="aspect-square overflow-hidden bg-muted">
        {/* TODO: Use a local image if no url */}
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="text-muted-foreground">No image</span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="mb-2 flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-semibold leading-tight line-clamp-2">
              {product.name}
            </h3>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {product.brand}
            </p>
          </div>
        </div>

        {/* Price and Colors */}
        <div className="mb-3 flex items-center justify-between">
          <span className="text-lg font-bold text-foreground">
            ${product.price}
          </span>
          {product.color && product.color.length > 0 && (
            <div className="flex space-x-1">
              {product.color.slice(0, 3).map((color, i) => (
                <div
                  key={i}
                  className="h-3 w-3 rounded-full border"
                  style={{ backgroundColor: color.toLowerCase() }}
                  title={color}
                />
              ))}
              {product.color.length > 3 && (
                <span className="text-xs text-muted-foreground">
                  +{product.color.length - 3}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Description */}
        {product.description && (
          <p className="mb-3 text-sm text-muted-foreground line-clamp-2">
            {product.description}
          </p>
        )}

        {/* Sizes */}
        {product.size && product.size.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-1">
            {product.size.map((size) => (
              <span
                key={size}
                className="rounded-md border px-2 py-1 text-xs font-medium"
              >
                {size}
              </span>
            ))}
          </div>
        )}

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={isAdded}
          className={cn(
            "flex w-full items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors",
            isAdded
              ? "bg-green-600 text-white"
              : "bg-primary text-primary-foreground hover:bg-primary/90"
          )}
        >
          {isAdded ? (
            <>
              <Check className="h-4 w-4" />
              Added!
            </>
          ) : (
            <>
              <ShoppingCart className="h-4 w-4" />
              Add to Cart
            </>
          )}
        </button>
      </div>

      {/* Style Tags */}
      {product.style && product.style.length > 0 && (
        <div className="absolute left-2 top-2 flex flex-wrap gap-1">
          {product.style.slice(0, 2).map((style) => (
            <span
              key={style}
              className="rounded-full bg-primary/90 px-2 py-1 text-xs font-medium text-primary-foreground"
            >
              {style}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
