// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        gradient: "gradient 3s ease infinite",
        shine: "shine 5s linear infinite",
      },
      keyframes: {
        gradient: {
          "0%, 100%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" },
        },
        shine: {
          "0%": { "background-position": "200% 0" },
          "100%": { "background-position": "-200% 0" },
        },
      },
    },
    fontFamily: {
      sans: ["var(--font-inter)", "sans-serif"],
      serif: ["var(--font-playfair)", "serif"],
    },
  },
};
