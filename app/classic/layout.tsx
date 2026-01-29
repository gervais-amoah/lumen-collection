"use client";

// app/classic/layout.tsx
import { ChatSearchItem } from "@/components/algolia-search/ChatSearchItem";
import { ALGOLIA_CONFIG, searchClient } from "@/lib/algolia";
import { AlgoliaProduct } from "@/types/product";
import { Inter } from "next/font/google";
import React from "react";
import { Chat, Configure, InstantSearch } from "react-instantsearch";
import "../../components/instantsearch.css/components/chat.scss";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export default function ClassicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-linear-to-br from-purple-950 to-gray-950 text-gray-100 font-sans pt-22 pb-12 min-h-screen h-full ">
      {/* Main content with padding to avoid header overlap */}
      <main
        className={`${inter.variable} w-[calc(100%_-_40px)] lg:w-4/5 max-w-7xl mx-auto `}
      >
        {children}
      </main>

      <div>
        <InstantSearch
          searchClient={searchClient}
          indexName={ALGOLIA_CONFIG.agentIndexName}
        >
          <Configure
            hitsPerPage={10}
            attributesToRetrieve={[
              "name",
              "description",
              "brand",
              "category",
              "size",
              "material",
              "price",
              "occasion",
              "style",
              "color",
              "objectID",
              "image_url",
            ]}
            attributesToSnippet={["name", "description"]}
            snippetEllipsisText="…"
          />
          <Chat
            agentId={ALGOLIA_CONFIG.agentId}
            title="Maya • Chat"
            translations={{
              header: {
                title: "Maya • Chat",
                closeLabel: "Close chat",
                // ...
              },
              // ...
            }}
            itemComponent={({ item }) => (
              <ChatSearchItem item={item as unknown as AlgoliaProduct} />
            )}
          />
        </InstantSearch>
      </div>

      <footer>
        <div className="w-full py-6 px-6 lg:px-48 py-8 border-t border-gray-800 text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Lumen Collection. All rights
          reserved.
        </div>
      </footer>
    </div>
  );
}
