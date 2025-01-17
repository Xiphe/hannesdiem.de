const { CARAMEL, ERROR, GRAPHITE, INK, PAPER, WATER } = require("./swatches");
const path = require("node:path");
const projectRoot = path.resolve(__dirname, "../..");

/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    boxShadow: false,
    boxShadowColor: false,
  },
  content: [path.join(projectRoot, "**/*.{js,ts,jsx,tsx,mdx}")],
  darkMode: "media",
  theme: {
    extend: {
      colors: (theme) => ({
        paper: PAPER,
        graphite: GRAPHITE,
        water: WATER,
        ink: INK,
        caramel: CARAMEL,
        error: ERROR,
      }),
      borderRadius: { xs: "0.0625rem" },
      fontFamily: {
        montserrat: ["var(--font-montserrat-alternates)", "sans-serif"],
        licorice: ["var(--font-licorice)", "serif"],
      },
      typography: require("./typography"),
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("../../../(common)/utils/light-tailwind-plugin/plugin"),
  ],
};
