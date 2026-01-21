"use client";

// app/classic/layout.tsx
import { ChatSearchItem } from "@/components/algolia-search/ChatSearchItem";
import { liteClient as algoliasearch } from "algoliasearch/lite";
import { Inter } from "next/font/google";
import React from "react";
import { Chat, Configure, InstantSearch } from "react-instantsearch";
import "../../components/instantsearch.css/components/chat.scss";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

// Algolia application ID and search-only API key
const agentAppId = process.env.NEXT_PUBLIC_ALGOLIA_AGENT_APP_ID!;
const agentApiKey = process.env.NEXT_PUBLIC_ALGOLIA_AGENT_API_KEY!;
const agentId = process.env.NEXT_PUBLIC_ALGOLIA_AGENT_ID!;
const agentIndexName = process.env.NEXT_PUBLIC_ALGOLIA_AGENT_INDEX_NAME!;

const searchClient = algoliasearch(agentAppId, agentApiKey);

export default function ClassicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-linear-to-br from-purple-950 to-gray-950 text-gray-100">
      {/* Main content with padding to avoid header overlap */}
      <main
        className={`${inter.variable} w-4/5 max-w-7xl mx-auto  font-sans pt-22 pb-12 min-h-screen h-full  `}
      >
        {children}
      </main>

      <div>
        <InstantSearch searchClient={searchClient} indexName={agentIndexName}>
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
            agentId={agentId}
            getSearchPageURL={({ query }) =>
              `${window.location.origin}/classic/search?q=${encodeURIComponent(query)}`
            }
            itemComponent={({ item }: { item: any }) => (
              <ChatSearchItem item={item} />
            )}
          />
        </InstantSearch>
      </div>
    </div>
  );
}
