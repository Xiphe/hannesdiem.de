import { Song, people } from "../../meta";
import Lyrics from "./DieMuehle.mdx";

export default {
  type: "song",
  title: "Die Mühle",
  slug: "song/die-muehle",
  Lyrics,
  authors: [people.HannesDiem, people.ChristinaDuewel],
  createdDate: 1249084800000,
  createdDateFormat: {
    year: "numeric",
  },
  releasedOn: ["halbkreis"],
} satisfies Song;
