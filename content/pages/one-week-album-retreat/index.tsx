import { Page } from "@/content";
import Content from "./content.mdx";
import ogLandscape from "./og_landscape.jpg";
import ogSquare from "./og_square.jpg";

export default {
  theme: "beach",
  title: "One Week Album",
  ogImage: [
    { ...ogLandscape, url: ogLandscape.src },
    { ...ogSquare, url: ogSquare.src },
  ],
  slug: "one-week-album-retreat",
  type: "page",
  description:
    "September 14-21, 2024 join seven creatives in Løkken to grow into a band and create soulful music",
  Content,
} satisfies Page;
