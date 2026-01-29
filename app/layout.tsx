import { Navbar } from "@/components/layout/navbar";
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
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
  title: "Lumen Collection",
  description:
    "Discover curated, luxury fashion selections with your personal AI stylist. Explore dresses, accessories, and bespoke looks tailored to your style.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} dark`}>
      <body className="font-sans antialiased">
        <div className="flex flex-col h-screen">
          <div className=" fixed w-full z-10">
            <Navbar />
          </div>
          {children}
        </div>

        {/* Show nice text on small devices, like "Please view on a larger screen" */}
        {/* <SmallScreenWarning /> */}
      </body>
    </html>
  );
}
