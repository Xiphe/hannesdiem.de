const { CARAMEL, ERROR, GRAPHITE, INK, PAPER, WATER } = require("./swatches");
const path = require("node:path");
const projectRoot = path.resolve(__dirname, "../..");

// export const proseStyles = cx(
//   "prose dark:prose-invert",
//   "prose-headings:font-licorice prose-headings:font-normal",
//   "prose-h1:text-7xl prose-h1:my-8",
//   "prose-h2:text-5xl prose-h2:mt-8 prose-h2:mb-4",
// );

/** @type {any} */
const typographyExtends = {
  typography: (theme) => ({
    DEFAULT: {
      css: {
        "h1,h2,h3,h4,h5,h6,th": {
          fontFamily: theme("fontFamily.licorice.0"),
        },
        h1: {
          fontWeight: "normal",
          fontSize: theme("fontSize.6xl"),
          marginTop: theme("margin.16"),
          marginBottom: theme("margin.8"),
          [`@media (min-width: ${theme("screens.lg")})`]: {
            fontSize: theme("fontSize.7xl"),
          },
        },
        h2: {
          fontWeight: "normal",
          fontSize: theme("fontSize.4xl"),
          marginTop: theme("margin.8"),
          marginBottom: theme("margin.4"),
          [`@media (min-width: ${theme("screens.lg")})`]: {
            fontSize: theme("fontSize.5xl"),
          },
        },
      },
    },
  }),
};

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
      ...typographyExtends,
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("../../../(common)/utils/light-tailwind-plugin/plugin"),
  ],
};
