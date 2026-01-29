// components/ProductActions.tsx
"use client";

import { useCartStore } from "@/store/useCartStore";
import { CartItem } from "@/types/product";
import { ShoppingCart } from "lucide-react";

interface ProductActionsProps {
  product: CartItem;
}

export function ProductActions({ product }: ProductActionsProps) {
  const addToCart = useCartStore((state) => state.addItem);

  const handleAdd = () => {
    addToCart({ ...product, quantity: 1 });
    // Optional: You could add a toast notification here
  };

  return (
    <button
      onClick={handleAdd}
      className="w-full py-4 px-6 bg-linear-to-r from-blue-900 to-indigo-700 hover:from-blue-700 hover:to-indigo-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 cursor-pointer"
    >
      <ShoppingCart className="w-5 h-5" />
      Add to Cart
    </button>
  );
}
