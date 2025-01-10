const path = require("node:path");
const projectRoot = path.resolve(__dirname, "../..");
const common = path.resolve(projectRoot, "../(common)");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    path.join(projectRoot, "**/*.{js,ts,jsx,tsx,mdx}"),
    path.join(common, "**/*.{js,ts,jsx,tsx,mdx}"),
  ],
  darkMode: "media",
  theme: {},
  plugins: [require("@tailwindcss/typography")],
};
