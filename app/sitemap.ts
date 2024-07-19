import { MetadataRoute } from "next";
import micromatch from "micromatch";
import { content } from "../content";

const baseUrl = "https://hannesdiem.de";

const ignoreRoutes = ["/spotify/**", "/_not-found", "/sitemap.xml"];

const additionalData: Record<string, Partial<MetadataRoute.Sitemap[number]>> = {
  "/(privacy|imprint)": { priority: 0.1 },
  "/work": { changeFrequency: "weekly" },
  "/one-week-album-retreat": { priority: 1, changeFrequency: "daily" },
  "/linktree": { priority: 0.9 },
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const {
    default: { staticRoutes },
  } = await import("../.next/routes-manifest.json");

  return [
    ...staticRoutes.map(({ page }) => page),
    ...Object.keys(content).map((page) => `/${page}`),
  ]
    .filter((page) => !micromatch([page], ignoreRoutes).length)
    .map((page): MetadataRoute.Sitemap[number] => ({
      url: `${baseUrl}${page}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
      ...(Object.entries(additionalData).find(
        ([path]) => micromatch([page], path).length
      ) || ["", {}])[1],
    }));
}
