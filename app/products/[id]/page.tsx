// app/classic/product/[id]/page.tsx
import { ProductActions } from "@/components/product-details/ProductActions";
import { fetchProductDetails, fetchRelatedProducts } from "@/lib/get-products"; // You'll need to create this
import {
  Box,
  ChevronRight,
  Clock,
  Image as ImageIcon,
  Palette,
  Ruler,
  Shield,
  ShoppingBag,
  Sparkles,
  Star,
  Tag,
  Truck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await fetchProductDetails(params.id);

  // Fetch related products (you'll need to implement this function)
  const relatedProducts = await fetchRelatedProducts(params.id);

  const renderArrayField = (
    items: string[] | null | undefined,
    label: string,
    Icon: React.ElementType,
    color: string = "text-gray-400",
  ) => {
    if (!items || items.length === 0) return null;

    return (
      <div className="mt-4">
        <div className="flex items-center gap-2 mb-2">
          <Icon className={`w-4 h-4 ${color}`} />
          <h4 className="text-sm font-medium text-gray-400 uppercase tracking-wider">
            {label}
          </h4>
        </div>
        <div className="flex flex-wrap gap-2">
          {items.slice(0, 5).map((item, index) => (
            <span
              key={index}
              className="px-3 py-1.5 bg-gray-800/60 text-gray-200 text-sm rounded-lg border border-gray-700/50 flex items-center gap-1.5"
            >
              {item}
            </span>
          ))}
          {items.length > 5 && (
            <span className="px-3 py-1.5 bg-gray-800/60 text-gray-400 text-sm rounded-lg border border-gray-700/50">
              +{items.length - 5}
            </span>
          )}
        </div>
      </div>
    );
  };

  return (
    <main className="bg-linear-to-br from-gray-900 via-gray-800 to-black pt-28 pb-16 px-4 sm:px-6 min-h-screen ">
      <div className="w-[calc(100%-40px)] lg:w-4/5 max-w-5xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center flex-wrap gap-1 text-sm text-gray-500">
            <li className="flex items-center gap-1">
              <Link
                href="/classic"
                className="hover:text-white transition-colors"
              >
                Classic
              </Link>
              <ChevronRight className="w-3 h-3" />
            </li>
            <li className="flex items-center gap-1">
              <Link
                href={`/classic?category=${product.category}`}
                className="hover:text-white transition-colors"
              >
                {product.category || "Products"}
              </Link>
              <ChevronRight className="w-3 h-3" />
            </li>
            <li className="font-medium text-white max-w-xs md:max-w-md truncate">
              {product.name}
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Image & Benefits */}
          <div>
            {/* Image Section */}
            <div className="bg-linear-to-br from-gray-800/50 to-gray-900/50 rounded-2xl overflow-hidden border-2 border-gray-700/30 aspect-square flex items-center justify-center mb-6 group">
              {product.image_url ? (
                <Image
                  width={800}
                  height={800}
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="text-gray-600 flex flex-col items-center justify-center gap-2">
                  <ImageIcon className="w-20 h-20" />
                  <span className="text-sm">No image available</span>
                </div>
              )}
            </div>

            {/* Quick Benefits */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700/30 flex items-center gap-3">
                <div className="p-2 bg-blue-900/20 rounded-lg">
                  <Truck className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-sm font-medium">Free Shipping</p>
                  <p className="text-xs text-gray-400">Orders over $100</p>
                </div>
              </div>
              <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700/30 flex items-center gap-3">
                <div className="p-2 bg-green-900/20 rounded-lg">
                  <Shield className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <p className="text-sm font-medium">Easy Returns</p>
                  <p className="text-xs text-gray-400">30-day policy</p>
                </div>
              </div>
            </div>

            {/* Popularity Score */}
            {product.popularity_score && (
              <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-400">
                    Popularity
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-bold">
                      {product.popularity_score}/100
                    </span>
                  </div>
                </div>
                <div className="w-full bg-gray-700/50 rounded-full h-2">
                  <div
                    className="bg-linear-to-r from-yellow-500 to-orange-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${product.popularity_score}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Product Info */}
          <div className="flex flex-col">
            {/* Category & Tags */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              {product.collection && (
                <span className="px-4 py-2 bg-linear-to-r from-purple-900/30 to-blue-900/30 text-purple-300 text-sm font-medium rounded-full border border-purple-700/30 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  {product.collection}
                </span>
              )}
              {product.category && (
                <span className="px-4 py-2 bg-indigo-900/20 text-indigo-300 text-sm font-medium rounded-full border border-indigo-700/30 flex items-center gap-1.5">
                  <Box className="w-3.5 h-3.5" />
                  {product.category}
                </span>
              )}
              {product.subcategory && (
                <span className="px-4 py-2 bg-gray-800/50 text-gray-300 text-sm font-medium rounded-full border border-gray-700/30">
                  {product.subcategory}
                </span>
              )}
            </div>

            {/* Product Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              {product.name}
            </h1>

            {/* Description */}
            <div className="mb-8">
              <p className="text-gray-300 text-lg mb-4 leading-relaxed">
                {product.description}
              </p>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Clock className="w-4 h-4" />
                <span>Usually ships in 2-3 business days</span>
              </div>
            </div>

            {/* Price */}
            <div className="mb-8">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-indigo-400">
                  ${product.price}
                </span>
                <span className="text-gray-400 text-sm">
                  + free shipping on orders over $100
                </span>
              </div>
            </div>

            {/* Details Sections */}
            <div className="space-y-6 mb-8">
              {renderArrayField(
                product.tags,
                "Style Tags",
                Tag,
                "text-blue-400",
              )}
              {renderArrayField(
                product.colors,
                "Available Colors",
                Palette,
                "text-purple-400",
              )}
              {renderArrayField(
                product.size,
                "Available Sizes",
                Ruler,
                "text-green-400",
              )}
              {renderArrayField(
                product.materials,
                "Materials & Care",
                Box,
                "text-indigo-400",
              )}
            </div>

            {/* Add to Cart */}
            <div className="sticky bottom-6 bg-gray-900/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 mt-auto">
              <ProductActions product={product} />
            </div>
          </div>
        </div>

        {/* RELATED ITEMS SECTION */}
        {relatedProducts.length > 0 && (
          <section className="mt-20 pt-10 border-t border-gray-800/50">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold flex items-center gap-3">
                  Complete The Look 😎
                </h2>
                <p className="text-gray-400 mt-2">
                  Frequently bought together with this item
                </p>
              </div>
              <Link
                href="/assistant"
                className="px-4 py-2 bg-linear-to-r from-purple-700/20 to-blue-700/20 text-purple-300 rounded-lg border border-purple-700/30 hover:border-purple-500/50 transition-colors text-sm font-medium flex items-center gap-2"
              >
                <span>Get AI styling help</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.slice(0, 3).map((related) => (
                <Link
                  key={related.id}
                  href={`/products/${related.id}`}
                  className="group bg-gray-800/30 rounded-xl border border-gray-700/30 p-5 hover:border-purple-500/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/5"
                >
                  <div className="flex gap-4">
                    {/* Thumbnail */}
                    <div className="w-24 h-24 shrink-0 bg-linear-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden">
                      {related.image_url ? (
                        <Image
                          width={96}
                          height={96}
                          src={related.image_url}
                          alt={related.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ShoppingBag className="w-8 h-8 text-gray-600" />
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                      <h3 className="font-semibold text-white group-hover:text-purple-300 transition-colors mb-1 line-clamp-1">
                        {related.name}
                      </h3>
                      <p className="text-sm text-gray-400 mb-2 line-clamp-2">
                        {related.description}
                      </p>
                      <div className="flex items-center justify-between mt-auto">
                        <span className="text-lg font-bold bg-clip-text text-transparent bg-linear-to-r from-white to-gray-300">
                          ${related.price}
                        </span>
                        <span className="text-xs px-2 py-1 bg-gray-800/50 rounded text-gray-300">
                          {related.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* CTA to AI Agent */}
            <div className="mt-10 text-center">
              <p className="text-gray-400 mb-4">
                Not sure what works together?
              </p>
              <Link
                href="/assistant"
                className="inline-flex items-center gap-3 px-6 py-3 bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-lg font-semibold transition-all duration-300 hover:scale-105 group"
              >
                <Sparkles className="w-5 h-5" />
                Let our AI stylist build your perfect outfit
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
