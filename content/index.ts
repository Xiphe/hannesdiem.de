import { Post } from "./meta";
import { releases } from "./releases";
export * from "./meta";

export const content: Record<string, Post | undefined> = {
  ...releases,
};
