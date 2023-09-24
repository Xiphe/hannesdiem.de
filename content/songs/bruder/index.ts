import { Song } from "@/content/meta";
import Lyrics from "./Bruder.mdx";
import { HannesDiem } from "@/content/meta/people";

export default {
  type: "song",
  title: "Bruder",
  slug: "song/bruder",
  Lyrics,
  authors: [HannesDiem],
  createdDate: 1249084800000,
  createdDateFormat: {
    year: "numeric",
  },
  releasedOn: ["halbkreis"],
} satisfies Song;
