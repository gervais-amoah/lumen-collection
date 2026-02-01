"use client";

// app/classic/layout.tsx
import DemoInfoDialog from "@/components/common/demo-dialog";
import { Inter } from "next/font/google";
import React from "react";
import "../../components/instantsearch.css/components/chat.scss";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export default function ClassicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-linear-to-br from-gray-900 via-gray-800 to-black text-gray-100 font-sans pt-22 pb-12 min-h-dvh h-full ">
      {/* Main content with padding to avoid header overlap */}
      <main
        className={`${inter.variable} w-[calc(100%-40px)] lg:w-4/5 max-w-7xl mx-auto `}
      >
        {children}
      </main>

      <footer>
        <div className="w-full py-6 px-6 lg:px-48 border-t border-gray-800 text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Lumen Collection. All rights
          reserved.
        </div>
      </footer>

      <DemoInfoDialog />
    </div>
  );
}
