"use client";

import DarkVeil from "@/components/animation/dark-veil";
import { ChatPanel } from "@/components/assistant/chat-panel";
import { WelcomeMessage } from "@/components/assistant/welcome-message";
import DemoInfoDialog from "@/components/common/demo-dialog";
import { ProductGrid } from "@/components/common/product-grid";
import FluidGlass from "@/components/ui/fluid-glass";
import { useProductStore } from "@/store/useProductStore";

export default function WelcomePage() {
  const products = useProductStore((state) => state.products);

  return (
    <div className="flex flex-1 overflow-hidden h-[calc(100%-120px)] max-w-[1320px] mx-auto mt-30">
      {/* Left Panel */}
      <div className="w-[calc(100%-500px)] relative p-4 pt-0 h-full">
        {products.length === 0 ? (
          <WelcomeMessage />
        ) : (
          <ProductGrid products={products} />
        )}
      </div>

      {/* Right Chat Panel */}
      <div className="w-[500px] max-w-2xl flex flex-col pr-6 pb-6">
        <FluidGlass className=" rounded-2xl h-full">
          <ChatPanel />
        </FluidGlass>
      </div>

      <div className="w-full h-full absolute top-0 left-0 pointer-events-none -z-10">
        <DarkVeil />
      </div>

      <DemoInfoDialog />
    </div>
  );
}
