const path = require("node:path");
const projectRoot = path.resolve(__dirname, "../..");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [path.join(projectRoot, "**/*.{js,ts,jsx,tsx,mdx}")],
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
