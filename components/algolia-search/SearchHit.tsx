// Hit.tsx
import { Highlight } from "react-instantsearch";

export function SearchHit({ hit }: { hit: any }) {
  return (
    <div className="group bg-gray-800/50 hover:bg-gray-800 border border-gray-700/50 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
      <div className="flex flex-col md:flex-row h-56">
        {/* Image Section */}
        <div className="w-full md:w-48 h-full shrink-0 bg-gray-900/50 flex items-center justify-center">
          {hit.image_url ? (
            <img
              src={hit.image_url}
              alt={hit.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="flex flex-col justify-between p-4 w-full">
          <div>
            <h3 className="font-semibold text-lg text-gray-100 group-hover:text-blue-300 transition-colors line-clamp-1">
              <Highlight attribute="name" hit={hit} />
            </h3>

            {/* Brand and Type */}
            <div className="flex flex-wrap gap-2 mt-2">
              {hit.brand && (
                <span className="text-xs bg-blue-900/30 text-blue-300 px-2 py-1 rounded-md">
                  Brand: {hit.brand}
                </span>
              )}
              {hit.type && (
                <span className="text-xs bg-indigo-900/30 text-indigo-300 px-2 py-1 rounded-md">
                  Type: {hit.type}
                </span>
              )}
            </div>

            {/* Description */}
            {hit.description && (
              <p className="mt-3 text-gray-300 text-sm line-clamp-2">
                {hit.description}
              </p>
            )}

            {/* Material and Colors */}
            <div className="mt-3 flex flex-wrap gap-2">
              {hit.material && (
                <span className="text-xs bg-gray-700/50 text-gray-300 px-2 py-1 rounded-md">
                  Material: {hit.material}
                </span>
              )}

              {hit.color?.length > 0 && (
                <div className="flex items-center gap-1">
                  <span className="text-xs text-gray-400">Colors:</span>
                  <div className="flex -space-x-1">
                    {hit.color.slice(0, 3).map((color: string, idx: number) => (
                      <div
                        key={idx}
                        className="w-4 h-4 rounded-full border-2 border-gray-800"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                    {hit.color.length > 3 && (
                      <div className="w-4 h-4 rounded-full bg-gray-700 flex items-center justify-center text-[10px]">
                        +{hit.color.length - 3}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Price and Add to Cart */}
          <div className="mt-4 flex items-center justify-between">
            <div className="font-bold text-xl text-blue-400">${hit.price}</div>
            <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] shadow-lg shadow-blue-500/20">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
