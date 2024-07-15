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
        destination:
          "https://docs.google.com/document/d/1LEo6Z-sLCULuJikA1JjbfcQTfP6UavQyjM7DehcMZeQ/edit?usp=sharing",
        permanent: false,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn1.daenemark.de",
        port: "",
        pathname: "/filestore/offerimage/source/801/*",
      },
      {
        protocol: "https",
        hostname: "cdn3.daenemark.de",
        port: "",
        pathname: "/filestore/offerimage/source/(813|3fb)/*",
      },
    ],
  },
  experimental: {
    mdxRs: true,
  },
};

const withMDX = require("@next/mdx")();
module.exports = withMDX(nextConfig);
