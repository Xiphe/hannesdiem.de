import { Song } from "@/content/meta";
import Lyrics from "./DieMuehle.mdx";
import { ChristinaDuewel, HannesDiem } from "@/content/meta/people";

export default {
  type: "song",
  title: "Die Mühle",
  slug: "song/die-muehle",
  Lyrics,
  authors: [HannesDiem, ChristinaDuewel],
  createdDate: 1249084800000,
  createdDateFormat: {
    year: "numeric",
  },
  releasedOn: ["halbkreis"],
} satisfies Song;
