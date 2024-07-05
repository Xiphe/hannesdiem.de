import { Song, people } from "../../meta";
import Lyrics from "./AllesBrennt.mdx";

export default {
  type: "song",
  title: "Alles Brennt",
  slug: "song/alles-brennt",
  Lyrics,
  authors: [people.HannesDiem],
  createdDate: 1217548800000,
  createdDateFormat: {
    year: "numeric",
  },
  releasedOn: ["halbkreis"],
} satisfies Song;
