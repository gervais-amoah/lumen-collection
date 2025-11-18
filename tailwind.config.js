// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      keyframes: {
        gradient: {
          "0%, 100%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" },
        },
      },
      animation: {
        gradient: "gradient 3s ease infinite",
      },
      backgroundSize: {
        "size-200": "200% 200%",
      },
    },
  },
};
