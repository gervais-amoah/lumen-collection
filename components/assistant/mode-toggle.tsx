"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Classic Mode", smLabel: "Classic", key: "classic" },
  {
    href: "/assistant",
    label: "✨ Agent Mode",
    smLabel: "Assistant",
    key: "assistant",
  },
] as const;

const getLinkClass = (isActive: boolean) =>
  cn(
    "px-2 md:px-4 py-1 md:py-2 rounded-full text-sm md:text-base font-medium transition-all duration-200",
    isActive
      ? "bg-blue-600 text-white shadow-md"
      : "text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700",
  );

export function ModeToggle() {
  const pathname = usePathname();
  const activeKey = pathname.startsWith("/assistant") ? "assistant" : "classic";

  return (
    <div className="flex gap-2 md:gap-6 rounded-full border border-gray/30 p-1 md:p-1.5 absolute left-1/2 transform -translate-x-1/2">
      {links.map(({ href, label, smLabel, key }) => (
        <Link key={key} href={href} className={getLinkClass(activeKey === key)}>
          <span className="hidden md:block">{label}</span>
          <span className="block md:hidden">{smLabel}</span>
        </Link>
      ))}
    </div>
  );
}
