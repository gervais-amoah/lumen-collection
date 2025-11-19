"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/useCartStore";
import { Product } from "@/types/product";
import { Check, ShoppingCart } from "lucide-react";
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
    <div className="relative">
      <Card
        className={cn(
          "group overflow-hidden transition-all hover:shadow-lg",
          "animate-in fade-in slide-in-from-bottom-4",
          "duration-500 fill-mode-both p-0 gap-0"
        )}
        style={{ animationDelay: `${index * 100}ms` }}
      >
        {/* Product Image */}
        <div className="relative overflow-hidden">
          <AspectRatio ratio={1}>
            {product.image_url ? (
              <Image
                src={product.image_url}
                alt={product.name}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-muted">
                <span className="text-muted-foreground text-sm">No image</span>
              </div>
            )}
          </AspectRatio>
          {/* Style Tags */}
          {product.style && product.style.length > 0 && (
            <div className="absolute left-3 top-3 flex flex-wrap gap-1">
              {product.style.slice(0, 2).map((style) => (
                <Badge
                  key={style}
                  variant="secondary"
                  className="bg-primary/90 text-primary-foreground hover:bg-primary"
                >
                  {style}
                </Badge>
              ))}
            </div>
          )}
        </div>
        <CardContent className="p-4">
          {/* Product Info */}
          <div className="mb-3 space-y-2">
            <h3 className="font-semibold leading-tight line-clamp-2">
              {product.name}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-1">
              {product.brand}
            </p>
          </div>
          {/* Price and Colors */}
          <div className="mb-3 flex items-center justify-between">
            <span className="text-lg font-bold text-foreground">
              ${product.price}
            </span>
            {product.color && product.color.length > 0 && (
              <div className="flex items-center gap-1">
                <div className="flex -space-x-1">
                  {product.color.slice(0, 3).map((color, i) => (
                    <div
                      key={i}
                      className="h-4 w-4 rounded-full border-2 border-background"
                      style={{ backgroundColor: color.toLowerCase() }}
                      title={color}
                    />
                  ))}
                </div>
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
                <Badge key={size} variant="outline" className="text-xs">
                  {size}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button
            onClick={handleAddToCart}
            disabled={isAdded}
            className={cn(
              "w-full gap-2 font-semibold transition-all",
              highlighted && !isAdded
                ? "bg-background hover:bg-muted text-foreground border-2 border-transparent"
                : isAdded
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-muted hover:bg-muted/70 text-foreground"
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
                <ShoppingCart className="h-4 w-4" />
                Add to Cart
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
