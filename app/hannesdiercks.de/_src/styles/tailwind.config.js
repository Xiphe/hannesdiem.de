const path = require("node:path");
const projectRoot = path.resolve(__dirname, "../..");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [path.join(projectRoot, "**/*.{js,ts,jsx,tsx,mdx}")],
  darkMode: "media",
  theme: {},
  plugins: [require("@tailwindcss/typography")],
};
