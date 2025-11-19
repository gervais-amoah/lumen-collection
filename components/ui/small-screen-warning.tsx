import Image from "next/image";

export default function SmallScreenWarning() {
  return (
    <div className="md:hidden overflow-hidden fixed h-dvh w-dvw inset-0 z-50 flex flex-col items-center justify-center p-6 text-center bg-[#161616]">
      <div className="relative mb-16">
        <Image
          src="/images/lc-logo-md.jpeg"
          alt="Classic Collection Hero"
          width={224}
          height={224}
          className="w-56 h-56 object-cover rounded-full border-4 border-gray-800 shadow-2xl shadow-gray-900/50"
        />
        {/* Subtle glow effect */}
        <div className="absolute inset-0 rounded-full bg-linear-to-r from-blue-500/80 to-purple-500/80 blur-xl -z-10"></div>
      </div>

      <p className="font-serif text-lg font-medium text-gray-100 leading-relaxed max-w-xs">
        For the best experience, please view this site on a desktop or tablet.
      </p>

      <p className="mt-4 text-sm text-gray-400 font-light">
        Our design is optimized for larger screens with richer interactions.
      </p>
    </div>
  );
}
