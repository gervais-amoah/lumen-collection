"use client";

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
      <div className="absolute top-0 left-0 ring-0 bottom-0 w-full -z-10 min-h-screen flex justify-center items-center gap-2.5 bg-[#161616]">
        <Image
          src="/images/lc-logo-md.jpeg"
          alt="Classic Collection Hero"
          width={224}
          height={224}
          className="w-56 h-56 object-cover"
        />
        <p className="text-[#b0945e] text-4xl">Loading products...</p>
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
        <h1 className="text-2xl font-bold mb-6">Classic Product List</h1>
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
              <p className="text-gray-700 mb-2">${p.price.toFixed(2)}</p>
              <p className="text-gray-600 text-sm">{p.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
