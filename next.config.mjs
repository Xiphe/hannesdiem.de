import { withPayload } from "@payloadcms/next/withPayload";
import withMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/hannesdiem.de",
        permanent: false,
      },
      {
        source: "/hannesdiem.de",
        destination: "/hannesdiem.de/linktree",
        permanent: false,
      },
      {
        source: "/hannesdiem.de/owa",
        destination: "/hannesdiem.de/one-week-album-retreat",
        permanent: true,
      },
      {
        source: "/hannesdiem.de/cv",
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

export default withPayload(withMDX()(nextConfig));
