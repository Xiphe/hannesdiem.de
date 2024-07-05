import { Song, people } from "../../meta";
import Lyrics from "./WieEsMirGefaellt.mdx";

export default {
  type: "song",
  title: "Wie Es Mir Gefällt",
  subtitle: "für July",
  slug: "song/wie-es-mir-gefaellt",
  Lyrics,
  authors: [people.HannesDiem],
  createdDate: 1249084800000,
  createdDateFormat: {
    year: "numeric",
  },
  releasedOn: ["halbkreis"],
} satisfies Song;
