"use client";

// components/assistant/chat-panel.tsx

import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  MAX_MESSAGE_LENGTH,
  MAX_MESSAGES_PER_SESSION,
  useAssistant,
} from "@/hooks/useAssistant";
import { cn } from "@/lib/utils";
import { useProductStore } from "@/store/useProductStore";
import { Send } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import TextType from "../animation/TextType"; // Assuming this path
import ChatHeader from "./chat-header";

// NOTE: MAX_MESSAGE_LENGTH and MAX_MESSAGES_PER_SESSION are now imported from the hook file.

export function ChatPanel() {
  const {
    messages,
    sendMessage,
    isLoading,
    currentInput,
    setCurrentInput,
    messagesRemaining,
  } = useAssistant();

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
      textareaRef.current.style.height = "56px"; // Reset height
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        120
      )}px`;
    }
  }, [currentInput]); // Use currentInput instead of message

  const handleSubmit = async (e: React.FormEvent | React.KeyboardEvent) => {
    e.preventDefault();

    const userMessage = currentInput.trim();

    if (
      !userMessage ||
      isLoading ||
      messages.length >= MAX_MESSAGES_PER_SESSION ||
      userMessage.length > MAX_MESSAGE_LENGTH
    )
      return;

    // The hook handles setting the user message, clearing the input, and setting loading state
    const result = await sendMessage(userMessage);

    // Update product store after receiving the result from the hook
    if (result) {
      if (result.products.length > 0) {
        setProducts(result.products);
      }
      if (result.highlightedId) {
        setHighlighted(result.highlightedId);
      }
    }

    // Only focus if user can still send messages (not at session limit)
    if (messages.length < MAX_MESSAGES_PER_SESSION) {
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 0);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const charactersRemaining = MAX_MESSAGE_LENGTH - currentInput.length;
  const isOverLimit = currentInput.length > MAX_MESSAGE_LENGTH;
  const isSessionEnded = messagesRemaining <= 0;

  return (
    <div className="flex h-full flex-col">
      <ChatHeader
        messagesRemaining={messagesRemaining}
        isSessionActive={!isSessionEnded}
      />

      {/* 2. Chat Messages Area - Refactoring Target */}
      <CardContent className="flex-1 overflow-auto p-4 space-y-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {messages.length === 0 ? (
          <div className="flex h-full items-center justify-center text-center">
            <div className="flex flex-col items-center space-y-2">
              <Image
                src="/images/assistant_avatar.jpg"
                alt="Assistant Avatar"
                className=" rounded-4xl"
                width={150}
                height={150}
              />
              <p className="font-serif text-muted-foreground">
                Your personal stylist is ready
              </p>
              <TextType
                className="font-sans text-xs text-muted-foreground"
                text={[
                  "Share your favorite colors or pieces—we’ll craft your signature style!",
                  "Event coming up? Let's pick the perfect outfit for the moment!",
                  "Tell me your vibe and watch me turn it into your ideal look!",
                ]}
                typingSpeed={50}
                deletingSpeed={20}
                pauseDuration={1500}
                showCursor={true}
                cursorCharacter="|"
              />
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

      {/* 3. Message Input/Footer - Refactoring Target */}
      <CardFooter className="border-t px-2.5 [.border-t]:pt-4 pb-4">
        <form onSubmit={handleSubmit} className="w-full space-y-2">
          <div className="flex w-full items-end gap-2">
            <div className="flex-1">
              <Textarea
                ref={textareaRef}
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading || isSessionEnded}
                placeholder="Describe what you're looking for... (e.g., 'red dress for wedding')"
                className="min-h-14 max-h-[120px] resize-none pl-2 pb-2 border-0 focus:ring-0 focus-visible:ring-0 bg-transparent"
              />
            </div>
            <Button
              type="submit"
              size="icon"
              disabled={
                !currentInput.trim() ||
                isLoading ||
                currentInput.length > MAX_MESSAGE_LENGTH ||
                isSessionEnded
              }
              className="shrink-0"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex justify-between text-xs">
            <span
              className={isOverLimit ? "text-red-500" : "text-muted-foreground"}
            >
              {isOverLimit
                ? `${
                    currentInput.length - MAX_MESSAGE_LENGTH
                  } characters over limit`
                : `${charactersRemaining} characters left`}
            </span>
          </div>
        </form>
      </CardFooter>
    </div>
  );
}
