"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Assistant Mode", key: "assistant" },
  { href: "/classic", label: "Classic Mode", key: "classic" },
] as const;
const getLinkClass = (isActive: boolean) =>
  cn(
    "px-4 py-2 rounded bg-muted hover:bg-muted/70",
    isActive && "bg-blue-600 text-white hover:bg-blue-600"
  );

export function ModeToggle() {
  const pathname = usePathname();
  const activeKey = pathname === "/classic" ? "classic" : "assistant";

  return (
    <div className="flex gap-2">
      {links.map(({ href, label, key }) => (
        <Link
          key={key}
          href={href}
          className={`
        px-4 py-2 rounded-lg font-medium transition-all duration-200
        ${
          activeKey === key
            ? "bg-blue-600 text-white shadow-md"
            : "text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
        }
      `}
        >
          {label}
        </Link>
      ))}
    </div>
  );
}
