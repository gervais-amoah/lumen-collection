import { Navbar } from "@/components/layout/navbar";
import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

// Luxury serif for headings / product names
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-playfair",
});

// Clean sans-serif for body / UI text
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "AI Shop Assistant",
  description: "AI-powered boutique fashion store",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} dark`}>
      <body className="font-sans antialiased">
        <div className="flex flex-col h-screen">
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
}
