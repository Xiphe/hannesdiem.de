import { Post } from "./meta";
import { releases } from "./releases";
import { songs } from "./songs";
import { pages } from "./pages";
export * from "./meta";

export const content = Object.fromEntries(
  [...releases, ...songs, ...pages].map((post) => [
    post.slug,
    post satisfies Post,
  ])
);
