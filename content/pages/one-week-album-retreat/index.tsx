import { Page } from "@/content";
import Content from "./content.mdx";
import ogImage from "./ogImage_feel_connect_create.png";

export default {
  theme: "beach",
  title: "One Week Album",
  ogImage: { ...ogImage, url: ogImage.src },
  slug: "one-week-album-retreat",
  type: "page",
  description:
    "September 14-21, 2024 join seven creatives in Løkken to grow into a band and create soulful music",
  Content,
} satisfies Page;
