/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/linktree",
        permanent: false,
      },
      {
        source: "/cv",
        destination: "https://docs.google.com/document/d/1LEo6Z-sLCULuJikA1JjbfcQTfP6UavQyjM7DehcMZeQ/edit?usp=sharing",
        permanent: false,
      },
    ];
  },
  experimental: {
    mdxRs: true,
  },
};

const withMDX = require("@next/mdx")();
module.exports = withMDX(nextConfig);
