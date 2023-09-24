import { Post } from "./meta";
import { releases } from "./releases";
import { songs } from "./songs";
export * from "./meta";

export const content = Object.fromEntries(
  [...releases, ...songs].map((post) => [post.slug, post satisfies Post])
);
