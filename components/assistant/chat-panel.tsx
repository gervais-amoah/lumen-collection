"use client";

import { Send } from "lucide-react";
import { useState } from "react";

export function ChatPanel() {
  const [message, setMessage] = useState("");

  return (
    <div className="flex h-full flex-col border-l">
      {/* Assistant Avatar Header */}
      <div className="border-b p-4">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-sm font-medium text-primary">AI</span>
          </div>
          <div>
            <h3 className="font-semibold">Style Assistant</h3>
            <p className="text-sm text-muted-foreground">Online</p>
          </div>
        </div>
      </div>

      {/* Chat Messages Area - Empty for welcome state */}
      <div className="flex-1 p-4">
        <div className="flex h-full items-center justify-center text-center">
          <p className="text-muted-foreground">
            Start a conversation to begin your styling journey
          </p>
        </div>
      </div>

      {/* Message Input */}
      <div className="border-t p-4">
        <div className="flex space-x-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Describe what you're looking for..."
            className="flex-1 rounded-lg border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            disabled={!message.trim()}
            className="rounded-lg bg-primary p-2 text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
