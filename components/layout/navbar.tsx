"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { ModeToggle } from "../assistant/mode-toggle";

export function Navbar() {
  return (
    <header className="flex items-center justify-between px-4 py-3 border-b">
      <Link href="/" className="font-semibold text-lg">
        Lumen Style
      </Link>

      <ModeToggle active="assistant" />

      <nav className="flex items-center gap-4">
        <Link href="/checkout" aria-label="Cart">
          <ShoppingCart className="w-5 h-5" />
        </Link>
      </nav>
    </header>
  );
}
