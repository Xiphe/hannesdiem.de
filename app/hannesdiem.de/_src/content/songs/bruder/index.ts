import { Song, people } from "../../meta";
import Lyrics from "./Bruder.mdx";

export default {
  type: "song",
  title: "Bruder",
  slug: "song/bruder",
  Lyrics,
  authors: [people.HannesDiem],
  createdDate: 1249084800000,
  createdDateFormat: {
    year: "numeric",
  },
  releasedOn: ["halbkreis"],
} satisfies Song;
