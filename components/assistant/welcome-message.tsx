"use client";

import FadeContent from "@/components/animation/fade-content";


export function WelcomeMessage() {
  return (
    <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0}>
      <div className="flex flex-col items-center justify-center h-full text-center px-6">
        <h1 className="text-3xl font-bold mb-2">
          Some Welcome Message
        </h1>
        <p className="text-muted-foreground max-w-md">
          Subtitle, inviting user to start conversation with assistant!
        </p>
      </div>
    </FadeContent>
  );
}
