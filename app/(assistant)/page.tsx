"use client";

import { ChatPanel } from "@/components/assistant/chat-panel";
import { WelcomeMessage } from "@/components/assistant/welcome-message";
import { ProductGrid } from "@/components/common/product-grid";
import { useProductStore } from "@/store/useProductStore";

export default function WelcomePage() {
  const products = useProductStore((state) => state.products);

  return (
    <div className="flex flex-1 overflow-hidden h-full">
      {/* Left Panel */}
      <div className="w-[65%] border-r relative overflow-auto p-4 h-full">
        {products.length === 0 ? (
          <WelcomeMessage />
        ) : (
          <ProductGrid products={products} />
        )}
      </div>

      {/* Right Chat Panel */}
      <div className="w-[35%] border-l flex flex-col h-full">
        <ChatPanel />
      </div>
    </div>
  );
}
