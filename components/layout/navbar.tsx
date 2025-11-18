"use client";

import { useCartStore } from "@/store/useCartStore";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "../assistant/mode-toggle";
import { Badge } from "../ui/badge";
import FluidGlass from "../ui/fluid-glass";

export function Navbar() {
  const totalItems = useCartStore((state) => state.getTotalItems());

  return (
    <FluidGlass className="my-6 w-4/5 mx-auto rounded-full px-6">
      <header className="flex items-center justify-between px-4 py-3">
        <Link href="/" className="font-semibold text-lg">
          Lumen Style
        </Link>

        <ModeToggle />

        <nav className="flex items-center gap-4">
          <Link href="/checkout" aria-label="Cart" className="relative">
            <ShoppingCart className="w-6 h-6" />
            <Badge className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums absolute -top-2 -right-2">
              {totalItems}
            </Badge>
          </Link>
        </nav>
      </header>
    </FluidGlass>
  );
}
