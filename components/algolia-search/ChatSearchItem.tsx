// ChatSearchItem.tsx
"use client";

import React from "react";

export const ChatSearchItem = React.memo(function ChatSearchItem({
  item,
}: {
  item: any;
}) {
  console.log("ChatSearchItem rendering with item:\n\n", JSON.stringify(item));

  const hasColors = item.color && item.color.length > 0;
  const hasSizes = item.size && item.size.length > 0;

  return (
    <div className="group bg-white dark:bg-[#0a0a0a] rounded-lg shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-500 max-w-sm mr-2">
      <div className="relative w-full h-40 bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-900 overflow-hidden">
        {/* Image */}
        {item.image_url ? (
          <img
            src={item.image_url}
            alt={item.name}
            className="!w-full !h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-gray-300 dark:text-gray-600">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                ></path>
              </svg>
            </div>
          </div>
        )}

        {/* Price Badge */}
        <div className="absolute top-2 right-2 bg-blue-700 dark:bg-blue-600 text-white font-semibold text-xs px-2 py-1 rounded-md shadow-sm">
          ${item.price}
        </div>
      </div>

      {/* Content section */}
      <div className="flex flex-col gap-1.5 px-3 py-2 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-700">
        <h3 className="font-semibold text-sm text-gray-900 dark:text-gray-100 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {item.name}
        </h3>

        <div className="flex flex-col justify-between items-start gap-1">
          {/* Material */}
          {item.material && (
            <div className="flex items-center gap-1">
              <span className="text-gray-500 dark:text-gray-400 text-xs">
                Material:
              </span>
              <span className="text-xs text-gray-700 dark:text-gray-300 font-medium truncate">
                {item.material}
              </span>
            </div>
          )}

          {/* Colors */}
          {hasColors && (
            <div className="flex items-center gap-1">
              <span className="text-gray-500 dark:text-gray-400 text-xs">
                Colors:
              </span>
              <div className="flex gap-1">
                {item.color!.slice(0, 3).map((color, index) => (
                  <div
                    key={index}
                    className="w-3 h-3 rounded-full border border-gray-300 dark:border-gray-600"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
                {item.color!.length > 3 && (
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                    +{item.color!.length - 3}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Sizes */}
          {hasSizes && (
            <div className="flex items-center gap-1">
              <span className="text-gray-500 dark:text-gray-400 text-xs">
                Sizes:
              </span>
              <div className="flex gap-1">
                {item.size!.slice(0, 3).map((size, index) => (
                  <span
                    key={index}
                    className="text-xs text-gray-700 dark:text-gray-300 font-medium truncate border border-gray-300 dark:border-gray-600 px-1 rounded-sm"
                  >
                    {size}
                  </span>
                ))}
                {item.size!.length > 3 && (
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                    +{item.size!.length - 3}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});
