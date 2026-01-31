// app/(classic)/pages.tsx
"use client";

import ShinyText from "@/components/animation/shiny-text";
import DropdownSearchExperience from "@/components/dropdown-search";
import { ALGOLIA_CONFIG } from "@/lib/algolia";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Star,
  ChevronRight,
  Sparkles,
  ShoppingBag,
  Tag,
  Shirt,
} from "lucide-react";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  price: number;
  description: string;
  tags: string[];
  image_url?: string;
  popularity_score: number;
}

interface CategorySection {
  title: string;
  description: string;
  icon: React.ReactNode;
  category: string;
}

export default function ClassicPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products");
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

  const categorySections: CategorySection[] = [
    {
      title: "Clothing",
      description: "Premium apparel for every occasion",
      icon: <Shirt className="w-5 h-5" />,
      category: "clothing",
    },
    {
      title: "Footwear",
      description: "Step out in style with our curated collection",
      icon: <ShoppingBag className="w-5 h-5" />,
      category: "footwear",
    },
    {
      title: "Accessories",
      description: "Complete your look with our essentials",
      icon: <Tag className="w-5 h-5" />,
      category: "accessories",
    },
  ];

  const getCategoryProducts = (category: string, limit: number = 3) => {
    return products
      .filter((p) => p.category === category)
      .sort((a, b) => b.popularity_score - a.popularity_score)
      .slice(0, limit);
  };

  const handleDiscoverClick = () => {
    alert(
      "✨ Discover more amazing products! This feature uses our AI assistant to help you find exactly what you're looking for. Try asking about specific occasions, styles, or let us recommend a complete outfit for you!",
    );
  };

  if (loading)
    return (
      <div className="w-full min-h-screen flex sm:flex-row flex-col justify-center items-center gap-4">
        <Image
          src="/images/lc-logo-md.jpeg"
          alt="Classic Collection Hero"
          width={152}
          height={152}
          className="w-38 h-38 object-cover rounded-full border-4 border-gray-800 shadow-2xl shadow-gray-900/50 animate-pulse"
        />
        <ShinyText
          text="Loading products..."
          speed={4}
          className="text-2xl text-white"
        />
      </div>
    );
  if (error)
    return <p className="text-red-600 text-center py-8">Error: {error}</p>;

  return (
    <div className="min-h-screen  text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="container mx-auto md:px-4 py-12 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-linear-to-r from-white to-gray-300">
              Dress With Confident
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Only pieces that make you feel great—every single time you wear
              them!
            </p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="container mx-auto md:px-4 -mt-8 mb-16 relative">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 p-6 shadow-2xl">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              What are you looking for today?
            </h2>
            <DropdownSearchExperience
              applicationId={ALGOLIA_CONFIG.agentAppId}
              apiKey={ALGOLIA_CONFIG.agentApiKey}
              indexName={ALGOLIA_CONFIG.agentIndexName}
              attributes={{
                primaryText: "name",
                secondaryText: "description",
                tertiaryText: "brand",
                url: "url",
                image: "image_url",
              }}
            />
            <p className="text-gray-400 text-sm mt-4 flex items-center gap-2">
              <ChevronRight className="w-4 h-4" />
              Try searching for &quot;dinner date&quot;, &quot;weeding
              dress&quot;, or &quot;leather belt&quot;
            </p>
          </div>
        </div>
      </div>

      {/* Category Sections */}
      <div className="container mx-auto md:px-4 pb-16 space-y-16">
        {categorySections.map((section) => {
          const categoryProducts = getCategoryProducts(section.category);

          return (
            <div key={section.category} className="space-y-6">
              {/* Section Header */}
              <div className="flex items-start md:items-center justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-linear-to-br from-blue-900/60 to-teal-900/60 rounded-lg">
                      {section.icon}
                    </div>
                    <h2 className="text-3xl font-bold">{section.title}</h2>
                  </div>
                  <p className="text-gray-400">{section.description}</p>
                </div>
                <button
                  onClick={handleDiscoverClick}
                  className="px-6 py-3 bg-linear-to-r from-blue-900/60 to-teal-900/60 hover:from-blue-900 hover:to-teal-900 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 flex items-center gap-2 group"
                >
                  <span className="hidden md:inline-block">Discover More</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Products Grid */}
              {categoryProducts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryProducts.map((product) => (
                    <div
                      key={product.id}
                      className="group relative bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden hover:border-purple-500/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/10"
                    >
                      {/* Popularity Badge */}
                      {product.popularity_score > 90 && (
                        <div className="absolute top-4 left-4 z-10 flex items-center gap-1 bg-linear-to-r from-yellow-600 to-orange-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          <Star className="w-3 h-3 fill-current" />
                          Popular
                        </div>
                      )}

                      {/* Product Image */}
                      <div className="relative h-64 overflow-hidden bg-linear-to-br from-gray-800 to-gray-900">
                        {product.image_url ? (
                          <Image
                            src={product.image_url}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <div className="text-gray-500 text-center">
                              <ShoppingBag className="w-16 h-16 mx-auto mb-2" />
                              <p className="text-sm">Product Image</p>
                            </div>
                          </div>
                        )}
                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-linear-to-t from-gray-900 via-transparent to-transparent opacity-60" />
                      </div>

                      {/* Product Info */}
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-bold text-lg mb-1 line-clamp-1">
                              {product.name}
                            </h3>
                            <p className="text-gray-400 text-sm">
                              {product.subcategory}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold bg-linear-to-r from-white to-gray-300 bg-clip-text text-transparent">
                              ${product.price.toFixed(2)}
                            </p>
                          </div>
                        </div>

                        <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                          {product.description}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {product.tags.slice(0, 3).map((tag, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-gray-700/50 rounded-md text-xs text-gray-300"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Add to Cart Button */}
                        <button className="w-full py-3 bg-linear-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 group/cart">
                          <ShoppingBag className="w-4 h-4 group-hover/cart:scale-110 transition-transform" />
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-800/30 rounded-xl border border-gray-700">
                  <p className="text-gray-400">
                    No products found in this category.
                  </p>
                </div>
              )}

              {/* Section Divider */}
              {section.category !== "accessories" && (
                <div className="h-px bg-linear-to-r from-transparent via-gray-700 to-transparent my-8" />
              )}
            </div>
          );
        })}
      </div>

      {/* CTA Section */}
      <div className="container mx-auto md:px-4 pb-16">
        <div className="bg-linear-to-r from-gray-800 to-gray-900 rounded-2xl border border-teal-500/30 p-12 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold mb-4">
              Experience the future of shopping
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Our AI assistant can help you find the perfect outfit for any
              occasion. Get personalized recommendations in seconds.
            </p>
            <Link
              href="/assistant"
              className="px-8 py-4 bg-linear-to-r from-blue-900/60 to-teal-900/60 hover:from-blue-900 hover:to-teal-900 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-teal-500/50 inline-flex items-center gap-3 group"
            >
              <Sparkles className="w-5 h-5 group-hover:rotate-180 transition-transform" />
              Try AI Agent
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
