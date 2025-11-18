"use client";

import { useCartStore } from "@/store/useCartStore";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "../assistant/mode-toggle";
import FluidGlass from "../ui/fluid-glass";

export function Navbar() {
  const totalItems = useCartStore((state) => state.getTotalItems());

  return (
    <FluidGlass className="my-6 w-4/5 mx-auto">
      <header className="flex items-center justify-between px-4 py-3">
        <Link href="/" className="font-semibold text-lg">
          Lumen Style
        </Link>

        <ModeToggle />

        <nav className="flex items-center gap-4">
          <Link href="/checkout" aria-label="Cart">
            <ShoppingCart className="w-5 h-5" />
            <span>{totalItems}</span>
          </Link>
        </nav>
      </header>
    </FluidGlass>
  );
}
