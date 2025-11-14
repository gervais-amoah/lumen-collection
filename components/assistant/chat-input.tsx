"use client";

import { SendHorizonal } from "lucide-react";

export function ChatInput() {
  return (
    <div className="border-t p-3 flex items-center gap-2">
      <input
        type="text"
        placeholder="Your message"
        className="flex-1 border rounded px-3 py-2 text-sm"
        disabled
      />
      <button className="p-2">
        <SendHorizonal className="w-5 h-5 opacity-40" />
      </button>
    </div>
  );
}
