"use client";

import { ChatPanel } from "@/components/assistant/chat-panel";
import { ProductGrid } from "@/components/assistant/product-grid";
import { WelcomeMessage } from "@/components/assistant/welcome-message";
import { useProductStore } from "@/store/useProductStore";

export default function WelcomePage() {
  const products = useProductStore((state) => state.products);

  return (
    <div className="flex flex-1 overflow-hidden">
      {/* Left Panel */}
      <div className="w-[65%] border-r relative overflow-auto p-4">
        {products.length === 0 ? (
          <WelcomeMessage />
        ) : (
          <ProductGrid products={products} />
        )}
      </div>

      {/* Right Chat Panel */}
      <ChatPanel />
    </div>
  );
}
