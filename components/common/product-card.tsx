import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Product } from "@/types/product";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
  highlighted?: boolean;
}

export function ProductCard({ product }: ProductCardProps) {
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
        style={{ animationDelay: `100ms` }}
      >
        {/* Image Section */}
        <div className="relative aspect-10/12 overflow-hidden">
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              className="object-cover object-bottom transition-all group-hover:scale-105"
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
          <div className="flex flex-col justify-between gap-4">
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

        <div className="border-t border-gray-50/10 mb-2" />

        <CardFooter className="p-4 pt-0">
          <p className="text-sm leading-tight line-clamp-3 text-gray-400">
            {product.description}
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
