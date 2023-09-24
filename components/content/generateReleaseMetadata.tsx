import { Metadata, ResolvingMetadata } from "next";
import { Release } from "@/content";

export async function generateReleaseMetadata(
  release: Release,
  searchParams: Record<string, string | string[]>,
  parent: ResolvingMetadata
) {
  return {
    title: release.title,
  } satisfies Metadata;
}
