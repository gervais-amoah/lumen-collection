"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

export function ModeToggle({ active }: { active: "assistant" | "classic" }) {
  return (
    <div className="flex gap-2">
      <Link
        href="/"
        className={cn(
          "px-4 py-2 rounded bg-muted hover:bg-muted/70",
          active === "assistant" && "bg-blue-600 text-white hover:bg-blue-600"
        )}
      >
        Assistant Mode
      </Link>
      <Link
        href="/classic"
        className={cn(
          "px-4 py-2 rounded bg-muted hover:bg-muted/70",
          active === "classic" && "bg-blue-600 text-white hover:bg-blue-600"
        )}
      >
        Classic Mode
      </Link>
    </div>
  );
}
