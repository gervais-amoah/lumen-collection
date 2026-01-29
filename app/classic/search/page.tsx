// app/classic/search/page.tsx

import SearchPageContent from "@/components/page-child/search-content";
import { Suspense } from "react";

function SearchBar() {
  return <span>Searching...</span>;
}

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchBar />}>
      <SearchPageContent />
    </Suspense>
  );
}
