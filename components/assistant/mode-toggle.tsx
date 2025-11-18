"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Assistant Mode ✨", key: "assistant" },
  { href: "/classic", label: "Classic Mode", key: "classic" },
] as const;
const getLinkClass = (isActive: boolean) =>
  cn(
    "px-4 py-2 rounded-full font-medium transition-all duration-200",
    isActive
      ? "bg-blue-600 text-white shadow-md"
      : "text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
  );

export function ModeToggle() {
  const pathname = usePathname();
  const activeKey = pathname === "/classic" ? "classic" : "assistant";

  return (
    <div className="flex gap-2">
      {links.map(({ href, label, key }) => (
        <Link key={key} href={href} className={getLinkClass(activeKey === key)}>
          {label}
        </Link>
      ))}
    </div>
  );
}
