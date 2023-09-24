/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./utils/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "media",
  theme: {
    extend: {
      colors: require("./colors"),
      boxShadowColor: {
        DEFAULT: "rgba(0, 0, 0, 0.5)",
        black: "rgba(0, 0, 0, 0.5)",
      },
      backgroundImage: {
        "full-gradient": "url('/img/hero-pattern.svg')",
      },
      fontFamily: {
        fuggles: ["Fuggles", "display"],
      },
    },
  },

  plugins: [require("@tailwindcss/typography")],
};
