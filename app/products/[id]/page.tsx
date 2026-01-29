// app/classic/product/[id]/page.tsx
import { ProductActions } from "@/components/product-details/ProductActions";
import { fetchProductDetails } from "@/lib/get-products";
import {
  Box,
  ChevronRight,
  Image as ImageIcon,
  Palette,
  Ruler,
  Tag,
} from "lucide-react";
import Image from "next/image";

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await fetchProductDetails(params.id);

  // Helper to render array fields with icons
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
    <main className="pt-32 pb-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <ol className="flex items-center flex-wrap gap-1 text-sm text-gray-500">
            <li className="flex items-center gap-1">
              Classic
              <ChevronRight className="w-3 h-3" />
            </li>
            <li className="flex items-center gap-1">
              {product.category || "Products"}
              <ChevronRight className="w-3 h-3" />
            </li>
            <li className="font-medium text-white max-w-xs md:max-w-md truncate">
              {product.name}
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Image Section */}
          <div className="bg-gray-800/30 rounded-2xl overflow-hidden border-4 border-gray-700/50 aspect-square flex items-center justify-center">
            {product.image_url ? (
              <Image
                width={150}
                height={150}
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-gray-600 flex flex-col items-center justify-center gap-2">
                <ImageIcon className="w-16 h-16" />
                <span className="text-sm">No image available</span>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                {product.brand && (
                  <span className="px-3 py-1.5 bg-blue-900/20 text-blue-300 text-sm font-medium rounded-full flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5" />
                    {product.brand}
                  </span>
                )}
                {product.category && (
                  <span className="px-3 py-1.5 bg-indigo-900/20 text-indigo-300 text-sm font-medium rounded-full flex items-center gap-1.5">
                    <Box className="w-3.5 h-3.5" />
                    {product.category}
                  </span>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                {product.name}
              </h1>

              <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                {product.description}
              </p>

              {/* Price */}
              <div className="mb-8">
                <span className="text-3xl font-bold bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-indigo-400">
                  ${product.price}
                </span>
              </div>

              {/* Details with Icons */}
              {renderArrayField(
                product.size,
                "Available Sizes",
                Ruler,
                "text-blue-400",
              )}
              {renderArrayField(
                product.materials,
                "Materials",
                Box,
                "text-indigo-400",
              )}
              {renderArrayField(
                product.colors,
                "Colors",
                Palette,
                "text-purple-400",
              )}

              {/* Add to Cart */}
              <ProductActions product={product} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
