import { Song } from "@/content/meta";
import Lyrics from "./PidderLueng.mdx";
import { HannesDiem } from "@/content/meta/people";

export default {
  type: "song",
  title: "Pidder Lüng",
  slug: "song/pidder-lueng",
  Lyrics,
  authors: [HannesDiem],
  createdDate: 1280620800000,
  createdDateFormat: {
    year: "numeric",
  },
  releasedOn: ["halbkreis"],
} satisfies Song;
