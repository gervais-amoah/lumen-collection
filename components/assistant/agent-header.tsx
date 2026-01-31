// app/agent/header.tsx
import { Inter, Playfair_Display } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
});

export default function AgentHeader() {
  return (
    <div className="flex gap-4 items-baseline justify-center py-4 px-4 text-3xl md:text-4xl lg:text-5xl leading-tight">
      <div className={`${inter.className}`}>Find With</div>
      <div className={`${playfair.variable} font-serif`}>
        <h1 className="font-bold bg-linear-to-r from-white via-gray-200 to-gray-300 bg-clip-text text-transparent">
          Intelligence
        </h1>
      </div>
    </div>
  );
}
