"use client";

import ShinyText from "@/components/animation/shiny-text";
import DropdownSearchExperience from "@/components/dropdown-search";
import Image from "next/image";
import { useEffect, useState } from "react";
import { liteClient as algoliasearch } from "algoliasearch/lite";
import { InstantSearch, Chat, Configure } from "react-instantsearch";
// import "instantsearch.css/components/chat.css";
import "../../components/instantsearch.css/components/chat.scss";
import { ChatSearchItem } from "@/components/algolia-search/ChatSearchItem";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image_url?: string;
}

// Algolia application ID and search-only API key
const applicationId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!;
const apiKey = process.env.NEXT_PUBLIC_ALGOLIA_API_KEY!;
const indexName = process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME!;

const agentAppId = process.env.NEXT_PUBLIC_ALGOLIA_AGENT_APP_ID!;
const agentApiKey = process.env.NEXT_PUBLIC_ALGOLIA_AGENT_API_KEY!;
const agentId = process.env.NEXT_PUBLIC_ALGOLIA_AGENT_ID!;
const agentIndexName = process.env.NEXT_PUBLIC_ALGOLIA_AGENT_INDEX_NAME!;

const searchClient = algoliasearch(agentAppId, agentApiKey);

export default function ClassicPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products?limit=6");
        const data = await res.json();
        setProducts(data.products || []);
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
        else setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading)
    return (
      <div className="absolute top-0 left-0 ring-0 bottom-0 w-full -z-10 min-h-screen flex justify-center items-center gap-2.5 bg-[#161616]">
        <Image
          src="/images/lc-logo-md.jpeg"
          alt="Classic Collection Hero"
          width={224}
          height={224}
          className="w-56 h-56 object-cover"
        />

        <ShinyText text="Loading products..." speed={4} className="text-2xl" />
      </div>
    );
  if (error) return <p className="text-red-600">Error: {error}</p>;

  return (
    <div className="pt-[50dvh] min-h-screen">
      {/* HERO IMAGE HERE */}
      <div className="absolute top-0 left-0 w-full h-[50dvh] -z-10">
        <Image
          src="/images/lc-logo-lg.jpeg"
          alt="Classic Collection Hero"
          width={1200}
          height={400}
          className="w-full h-full object-cover mb-8 object-left"
        />
      </div>
      <div className="p-8">
        <div className="flex gap-4">
          <div id="algolia_chat" className=" w-3/5">
            {/* <InstantSearch
              indexName="instant_search"
              searchClient={searchClient}
            >
              <Chat agentId="8f7c4a2d-3b1e-4d5f-9a6c-e2b1f5d0c3e9" />
            </InstantSearch> */}

            <DropdownSearchExperience
              applicationId={applicationId}
              apiKey={apiKey}
              indexName={indexName}
              attributes={{
                primaryText: "name", // the attribute to display in the hits list
                secondaryText: "description", // the secondary attribute to display in the hits list
                tertiaryText: "brand", // the tertiary attribute to display in the hits list
                url: "url", // the URL of the hit
                image: "image_url", // the image URL of the hit
              }}
              // darkMode={false}
            />
          </div>
        </div>

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
              itemComponent={({ item }: { item: any }) => (
                <ChatSearchItem item={item} />
              )}
              // tools={{
              // addToCart: {
              //   layoutComponent: ({
              //     // the current message for the tool
              //     message,
              //     // the current InstantSearch UI state (query, page, refinements, etc.)
              //     indexUiState,
              //     // function to update the InstantSearch UI state
              //     setIndexUiState,
              //     // function to add a result from the tool to the chat
              //     addToolResult,
              //   }) => <div>Tool: addToCart</div>,
              //   onToolCall: ({ addToolResult }) =>
              //     addToolResult({ output: { text: "result" } }),
              // },
              // }}
            />
          </InstantSearch>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <div key={p.id} className="border p-4 rounded shadow-sm">
              {p.image_url ? (
                <Image
                  src={p.image_url}
                  alt={p.name}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover mb-4 rounded"
                />
              ) : (
                <Image
                  src="/images/placeholder.svg"
                  alt="Placeholder"
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover mb-4 rounded"
                />
              )}
              <h2 className="font-semibold text-lg">{p.name}</h2>
              <p className="text-gray-300 mb-2">${p.price.toFixed(2)}</p>
              <p className="text-gray-400 text-sm">{p.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
