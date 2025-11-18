"use client";

import FadeContent from "@/components/animation/fade-content";

export function WelcomeMessage() {
  return (
    <div className="h-full flex flex-col justify-center items-center space-y-4 px-4  py-12">
      <FadeContent
        blur={true}
        duration={1000}
        easing="ease-out"
        initialOpacity={0}
      >
        <div className="text-center">
          <h1 className="font-serif text-4xl md:text-5xl text-gray-900 mb-4">
            Discover Your Signature Style
          </h1>
          <p className="font-sans text-base md:text-xl text-gray-700">
            Let our personal AI stylist guide you through our curated collection
            — find the perfect look effortlessly.
          </p>
        </div>
      </FadeContent>
    </div>
  );
}
