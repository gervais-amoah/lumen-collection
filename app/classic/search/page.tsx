"use client";

import { liteClient as algoliasearch } from "algoliasearch/lite";
import {
  InstantSearch,
  SearchBox,
  Hits,
  Configure,
  Pagination,
} from "react-instantsearch";
import { useSearchParams } from "next/navigation";
import { SearchHit } from "@/components/algolia-search/SearchHit";

const agentAppId = process.env.NEXT_PUBLIC_ALGOLIA_AGENT_APP_ID!;
const agentApiKey = process.env.NEXT_PUBLIC_ALGOLIA_AGENT_API_KEY!;

const searchClient = algoliasearch(agentAppId, agentApiKey);

function Hit({ hit }: { hit: any }) {
  return (
    <div style={{ padding: 12, borderBottom: "1px solid #eee" }}>
      <strong>{hit.name}</strong>
      <div>{hit.description}</div>
      <div>${hit.price}</div>
    </div>
  );
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";

  return (
    <div className="p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold bg-clip-text ">Search Results</h1>
          {query && (
            <p className="mt-2 text-gray-400">
              Showing results for:{" "}
              <span className="font-medium text-gray-200">
                &quot;{query}&quot;
              </span>
            </p>
          )}
        </header>

        <InstantSearch
          searchClient={searchClient}
          indexName={process.env.NEXT_PUBLIC_ALGOLIA_AGENT_INDEX_NAME!}
          initialUiState={{
            [process.env.NEXT_PUBLIC_ALGOLIA_AGENT_INDEX_NAME!]: {
              query,
            },
          }}
        >
          <Configure hitsPerPage={20} />

          {/* Search Box */}
          <div className="mb-10 max-w-2xl mx-auto hidden">
            <SearchBox
              autoFocus
              className="w-full"
              placeholder="Search products..."
            />
          </div>

          {/* Results */}
          <div className="">
            <Hits
              hitComponent={SearchHit}
              classNames={{
                list: "flex flex-col gap-6 justify-center",
                item: "w-full",
              }}
            />
          </div>

          {/* Empty State */}
          <div className="mt-12  hidden">
            <Pagination />
          </div>
        </InstantSearch>
      </div>
    </div>
  );
}
