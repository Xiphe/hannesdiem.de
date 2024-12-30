import { seed } from "@payload/seed/dev-seeds";
import { BasePayload } from "payload";

export async function devSeed(payload: BasePayload) {
  await seed(payload, "hdm-persons", [
    {
      name: "Hannes Diem",
      link: "https://hannesdiem.de",
      ogProfile: "https://hannesdiem.de/about",
    },
  ]);

  await seed(payload, "hdm-contribution-roles", [
    { role: "Composition" },
    { role: "Lyrics" },
  ]);
}
