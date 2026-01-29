"use client";

import { SearchHit } from "@/components/algolia-search/SearchHit";
import { ALGOLIA_CONFIG, searchClient } from "@/lib/algolia";
import { useSearchParams } from "next/navigation";
import {
  Configure,
  Hits,
  InstantSearch,
  Pagination,
  SearchBox,
} from "react-instantsearch";

export default function SearchPageContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";

  return (
    <div className="p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold bg-clip-text">Search Results</h1>
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
          indexName={ALGOLIA_CONFIG.agentIndexName}
          initialUiState={{
            [ALGOLIA_CONFIG.agentIndexName]: { query },
          }}
        >
          <Configure hitsPerPage={20} />

          <div className="mb-10 max-w-2xl mx-auto hidden">
            <SearchBox
              autoFocus
              className="w-full"
              placeholder="Search products..."
            />
          </div>

          <div>
            <Hits
              hitComponent={SearchHit}
              classNames={{
                list: "flex flex-col gap-6 justify-center",
                item: "w-full",
              }}
            />
          </div>

          <div className="mt-12 hidden">
            <Pagination />
          </div>
        </InstantSearch>
      </div>
    </div>
  );
}
