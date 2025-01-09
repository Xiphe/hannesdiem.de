import { withPayload } from "@payloadcms/next/withPayload";
import withMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      ...redirectsFor("cms.xiphe.net", [
        {
          source: "/",
          destination: "/admin",
          permanent: true,
        },
      ]),
      ...redirectsFor("hannesdiem.de", [
        {
          source: "/",
          destination: "/linktree",
          permanent: false,
        },
        {
          source: "/owa",
          destination: "/one-week-album-retreat",
          permanent: true,
        },
        {
          source: "/cv",
          destination:
            "https://docs.google.com/document/d/1LEo6Z-sLCULuJikA1JjbfcQTfP6UavQyjM7DehcMZeQ/edit?usp=sharing",
          permanent: false,
        },
      ]),
      ...redirectsFor("hannesdiercks.de", [
        {
          source: "/cv",
          destination:
            "https://docs.google.com/document/d/1qjGGhtciJNSU7MJ4v0RRkJ3Q4uF_zA1Nu3tEPhL0Grc/edit?usp=sharing",
          permanent: false,
        },
      ]),
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
    esmExternals: true,
    // dynamicIO: true,
  },
};

export default withPayload(withMDX()(nextConfig));

/**
 * @param {string} host
 * @param {Awaited<ReturnType<NonNullable<import('next').NextConfig["redirects"]>>>} redirects
 */
function redirectsFor(host, redirects) {
  return redirects.map(({ has = [], ...rest }) => ({
    ...rest,
    has: has.concat([
      {
        type: "host",
        value: host,
      },
    ]),
  }));
}
