"use client";

import { useCartStore } from "@/store/useCartStore";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ModeToggle } from "../assistant/mode-toggle";
import { AboutCreatorDialog } from "../common/about-dialog";
import { Badge } from "../ui/badge";
import FluidGlass from "../ui/fluid-glass";

export function Navbar() {
  const totalItems = useCartStore((state) => state.getTotalItems());
  const [aboutOpen, setAboutOpen] = useState(false);

  return (
    <>
      <FluidGlass className="my-6 w-4/5 max-w-7xl mx-auto rounded-full pl-0 pr-6">
        <header className="flex items-center justify-between px-4 py-3 relative">
          <button
            onClick={() => setAboutOpen(true)}
            className="font-semibold font-serif text-lg hover:[&>img]:scale-115 cursor-pointer transition-all flex items-center gap-2 "
          >
            <Image
              src="/images/lc-logo-sm.jpeg"
              alt="Lumen Logo"
              className="rounded-full transition-transform duration-200 "
              width={35}
              height={35}
            />
            Lumen Collection
          </button>

          <ModeToggle />

          <div className="flex items-center gap-4">
            <Link
              href="/checkout"
              aria-label="Cart"
              className="relative hover:bg-accent-foreground/10 p-2 rounded-full transition"
            >
              <ShoppingCart className="w-6 h-6" />
              <Badge className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums absolute -top-1 -right-1">
                {totalItems}
              </Badge>
            </Link>
          </div>
        </header>
      </FluidGlass>

      <AboutCreatorDialog open={aboutOpen} onOpenChange={setAboutOpen} />
    </>
  );
}
