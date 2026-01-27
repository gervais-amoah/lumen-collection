"use client";

import DarkVeil from "@/components/animation/dark-veil";
import AlgoliaChat from "@/components/assistant/algolia-chat";
import DemoInfoDialog from "@/components/common/demo-dialog";
import FluidGlass from "@/components/ui/fluid-glass";

export default function WelcomePage() {
  return (
    <div className="overflow-hidden h-[calc(100%-120px)] w-full max-w-[1320px] mx-auto mt-30">
      {/* Main Chat Panel */}
      <div className="flex pb-6 w-4/5 h-full mx-auto">
        <FluidGlass className="w-full rounded-2xl h-full">
          {/* <ChatPanel /> */}
          <AlgoliaChat />
        </FluidGlass>
      </div>

      <div className="w-full h-full absolute top-0 left-0 pointer-events-none -z-10">
        <DarkVeil />
      </div>

      <DemoInfoDialog />
    </div>
  );
}
