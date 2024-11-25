import { MetadataRoute } from "next";
import micromatch from "micromatch";
import { content } from "./hannesdiem.de/_src/content";

const baseUrl = "https://hannesdiem.de";

const ignoreRoutes = ["/spotify/**", "/_not-found", "/sitemap.xml"];

const additionalData: Record<string, Partial<MetadataRoute.Sitemap[number]>> = {
  "/(privacy|imprint)": { priority: 0.1 },
  "/one-week-album-retreat": { priority: 1 },
  "/linktree": { priority: 0.9 },
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const path = Promise.resolve("../routes-manifest.json");

  let staticRoutes: { page: string }[] = [];
  try {
    staticRoutes = (await import(await path)).default.staticRoutes;
  } catch (_) {
    // ¯\_(ツ)_/¯
  }

  return [
    ...staticRoutes.map(({ page }: { page: string }) => page),
    ...Object.keys(content).map((page) => `/${page}`),
  ]
    .filter((page) => !micromatch([page], ignoreRoutes).length)
    .map((page): MetadataRoute.Sitemap[number] => ({
      url: `${baseUrl}${page}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
      ...(Object.entries(additionalData).find(
        ([path]) => micromatch([page], path).length,
      ) || ["", {}])[1],
    }));
}
