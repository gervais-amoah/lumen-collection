"use client";

import DarkVeil from "@/components/animation/dark-veil";
import AgentHeader from "@/components/assistant/agent-header";
import AlgoliaChat from "@/components/assistant/algolia-chat";
import FluidGlass from "@/components/ui/fluid-glass";

export default function WelcomePage() {
  return (
    <div className="overflow-hidden flex flex-1 flex-col w-full mx-auto mt-24 lg:mt-30">
      {/* Hero Section */}
      <AgentHeader />

      {/* Main Chat Panel */}
      <div className="flex flex-1 pb-6 w-[calc(100%-40px)] lg:w-4/5 max-w-7xl h-full mx-auto">
        <FluidGlass className="flex flex-1 rounded-2xl">
          <AlgoliaChat />
        </FluidGlass>
      </div>

      <div className="w-full h-full absolute top-0 left-0 pointer-events-none -z-10">
        <DarkVeil />
      </div>
    </div>
  );
}
