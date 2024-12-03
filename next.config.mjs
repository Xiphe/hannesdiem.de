import { withPayload } from "@payloadcms/next/withPayload";
import withMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/linktree",
        has: [
          {
            type: "host",
            value: "hannesdiem.de",
          },
        ],
        permanent: false,
      },
      {
        source: "/owa",
        destination: "/one-week-album-retreat",
        has: [
          {
            type: "host",
            value: "hannesdiem.de",
          },
        ],
        permanent: true,
      },
      {
        source: "/cv",
        destination:
          "https://docs.google.com/document/d/1LEo6Z-sLCULuJikA1JjbfcQTfP6UavQyjM7DehcMZeQ/edit?usp=sharing",
        has: [
          {
            type: "host",
            value: "hannesdiem.de",
          },
        ],
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

export default withPayload(withMDX()(nextConfig));
