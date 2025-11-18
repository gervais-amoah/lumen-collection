"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useProductStore } from "@/store/useProductStore";
import { Send } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// Gemini Flash free tier: 10 RPM / 250 RPD
// Conservative limit to stay within free tier
const MAX_MESSAGE_LENGTH = 200; // Characters
const MAX_MESSAGES_PER_SESSION = 15; // Prevent excessive usage

export function ChatPanel() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; content: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Product store actions
  const setProducts = useProductStore((state) => state.setProducts);

  const setHighlighted = useProductStore(
    (state) => state.setHighlightedProduct
  );

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus textarea on mount
  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        120
      )}px`;
    }
  }, [message]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !message.trim() ||
      isLoading ||
      messages.length >= MAX_MESSAGES_PER_SESSION ||
      message.length > MAX_MESSAGE_LENGTH
    )
      return;

    const userMessage = message.trim();
    setMessage("");
    setIsLoading(true);

    // Add user message to chat
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);

    try {
      // return checkSupabaseHealth();
      // TODO: Replace with actual API call
      const response = await fetch("/api/converse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userMessage,
          history: messages,
        }),
      });

      const data = await response.json();

      // log data for debugging
      console.log("ChatPanel received data: \n\n", data);

      // Add assistant response to chat
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.assistant_response,
        },
      ]);

      // update products display logic can go here
      if (data.products && data.products.length > 0) {
        console.log("Products returned:", data.products);
        setProducts(data.products);
      }

      if (data.highlighted_product_id) {
        setHighlighted(data.highlighted_product_id);
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I'm having trouble connecting. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);

      // Only focus if user can still send messages (not at session limit)
      if (messages.length < MAX_MESSAGES_PER_SESSION) {
        setTimeout(() => {
          textareaRef.current?.focus();
        }, 0);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const charactersRemaining = MAX_MESSAGE_LENGTH - message.length;
  const messagesRemaining = MAX_MESSAGES_PER_SESSION - messages.length;
  const isOverLimit = message.length > MAX_MESSAGE_LENGTH;

  return (
    <div className="flex h-full flex-col border-l">
      {/* Assistant Header */}
      <CardHeader className="border-b p-4">
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-primary/10 text-primary">
              <Image
                src="/images/assistant_avatar.jpg"
                alt="Assistant Avatar"
                width={40}
                height={40}
              />
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-serif font-semibold">Style Assistant</h3>
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-800 hover:bg-green-100"
              >
                Online
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              {messagesRemaining} messages remaining
            </p>
          </div>
        </div>
      </CardHeader>

      {/* Chat Messages Area */}
      <CardContent className="flex-1 overflow-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex h-full items-center justify-center text-center">
            <div className="flex flex-col items-center space-y-2">
              <Image
                src="/images/assistant_avatar.jpg"
                alt="Assistant Avatar"
                width={150}
                height={150}
              />
              <p className="font-serif text-muted-foreground">
                Start a conversation to begin your styling journey
              </p>
              <p className="font-sans text-xs text-muted-foreground">
                Ask me about dresses, accessories, or your preferred style!
              </p>
            </div>
          </div>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={cn(
                "flex gap-3 max-w-[85%]",
                msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
              )}
            >
              <div
                className={cn(
                  "rounded-lg px-3 py-2 text-sm",
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                )}
              >
                {msg.content}
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="flex gap-3 max-w-[85%] mr-auto">
            <div className="flex items-center rounded-lg bg-muted px-3 py-2 text-sm">
              <div className="flex space-x-1">
                <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground"></div>
                <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]"></div>
                <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.5s]"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </CardContent>

      {/* Message Input */}
      <CardFooter className="border-t px-4 [.border-t]:pt-4 pb-4">
        <form onSubmit={handleSubmit} className="w-full space-y-2">
          <div className="flex w-full items-end gap-2">
            <div className="flex-1">
              <Textarea
                ref={textareaRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Describe what you're looking for... (e.g., 'red dress for wedding')"
                className="min-h-10 max-h-[120px] resize-none p-0 pb-2 border-0 focus:ring-0 focus-visible:ring-0 bg-transparent"
              />
            </div>
            <Button
              type="submit"
              size="icon"
              disabled={
                !message.trim() ||
                isLoading ||
                message.length > MAX_MESSAGE_LENGTH ||
                messages.length >= MAX_MESSAGES_PER_SESSION
              }
              className="shrink-0"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex justify-between text-xs">
            <span
              className={isOverLimit ? "text-red-500" : "text-muted-foreground"}
            >
              {isOverLimit
                ? `${message.length - MAX_MESSAGE_LENGTH} characters over limit`
                : `${charactersRemaining} characters left`}
            </span>
          </div>
        </form>
      </CardFooter>
    </div>
  );
}
