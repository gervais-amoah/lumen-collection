"use client";

import ShinyText from "@/components/animation/shiny-text";
import DropdownSearchExperience from "@/components/dropdown-search";
import { ALGOLIA_CONFIG } from "@/lib/algolia";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image_url?: string;
}

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
      <div className="w-full min-h-screen flex sm:flex-row flex-col justify-center items-center gap-4">
        <Image
          src="/images/lc-logo-md.jpeg"
          alt="Classic Collection Hero"
          width={152}
          height={152}
          className="w-38 h-38 object-cover rounded-full border-4 border-gray-800 shadow-2xl shadow-gray-900/50"
        />

        <ShinyText text="Loading products..." speed={4} className="text-2xl" />
      </div>
    );
  if (error) return <p className="text-red-600">Error: {error}</p>;

  return (
    <div className="md:py-8">
      <div id="algolia_chat" className="mx-auto my-6 w-3/5">
        <DropdownSearchExperience
          applicationId={ALGOLIA_CONFIG.appId}
          apiKey={ALGOLIA_CONFIG.apiKey}
          indexName={ALGOLIA_CONFIG.indexName}
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
  );
}
