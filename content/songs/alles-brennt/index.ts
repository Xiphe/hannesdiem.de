import { Song } from "@/content/meta";
import Lyrics from "./AllesBrennt.mdx";
import { HannesDiem } from "@/content/meta/people";

export default {
  type: "song",
  title: "Alles Brennt",
  slug: "song/alles-brennt",
  Lyrics,
  authors: [HannesDiem],
  createdDate: 1217548800000,
  createdDateFormat: {
    year: "numeric",
  },
  releasedOn: ["halbkreis"],
} satisfies Song;
