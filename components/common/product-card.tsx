"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/useCartStore";
import { Product } from "@/types/product";
import { Check, CirclePlus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
  index: number;
  highlighted?: boolean;
}

export function ProductCard({ product, index, highlighted }: ProductCardProps) {
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
    <div className="relative w-full mx-auto">
      <style>{`
        @keyframes borderPulse {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.5); }
          50% { box-shadow: 0 0 30px rgba(16, 185, 129, 0.8); }
        }
      `}</style>

      <Card
        className={cn(
          "group overflow-hidden transition-all hover:shadow-lg relative gap-0 p-0",
          "animate-in fade-in slide-in-from-bottom-4",
          "duration-500 fill-mode-both mr-2",
        )}
        style={{ animationDelay: `${index * 100}ms` }}
      >
        {/* Image Section */}
        <div className="relative aspect-10/12 overflow-hidden">
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              className="object-cover object-bottom transition-transform group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gray-200">
              <span className="text-gray-500 text-sm">No image</span>
            </div>
          )}

          <div className="absolute right-3 top-3 flex flex-wrap gap-1 z-10">
            <Badge variant="secondary">${product.price}</Badge>
          </div>
        </div>

        {/* Content Section */}
        <CardContent className="p-4">
          {/* Product Info */}
          <div className="flex flex-col justify-between gap-4 mb-3">
            <div className="space-y-1 flex-1">
              <h3 className="font-semibold leading-tight line-clamp-2 text-gray-300">
                {product.name}
              </h3>
              <p className="text-sm text-gray-400 line-clamp-1">
                {product.brand}
              </p>
            </div>

            {/* Style Tags */}
            {product.style && product.style.length > 0 && (
              <div className="flex flex-wrap gap-1 z-10">
                {" "}
                {product.style.slice(0, 2).map((style) => (
                  <Badge key={style} variant="secondary">
                    {style}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <Button
            onClick={handleAddToCart}
            disabled={isAdded}
            className={cn(
              "w-full gap-2 font-semibold transition-all",
              highlighted && !isAdded
                ? "bg-background hover:bg-muted text-foreground border-2 border-blue-500"
                : isAdded
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : "bg-muted hover:bg-muted/70 text-foreground",
            )}
            size="sm"
            style={
              highlighted && !isAdded
                ? { animation: "borderPulse 2s ease-in-out infinite" }
                : undefined
            }
          >
            {isAdded ? (
              <>
                <Check className="h-4 w-4" />
                Added to Cart
              </>
            ) : (
              <>
                <CirclePlus className="h-4 w-4" />
                Add to Cart
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
