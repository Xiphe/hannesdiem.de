import { Post, content } from "@/content";

export function getPost(slug: string | string[]): Post | undefined {
  return content[Array.isArray(slug) ? slug.join("/") : slug];
}
