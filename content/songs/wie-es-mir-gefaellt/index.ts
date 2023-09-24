import { Song } from "@/content/meta";
import Lyrics from "./WieEsMirGefaellt.mdx";
import { HannesDiem } from "@/content/meta/people";

export default {
  type: "song",
  title: "Wie Es Mir Gefällt",
  subtitle: "für July",
  slug: "song/wie-es-mir-gefaellt",
  Lyrics,
  authors: [HannesDiem],
  createdDate: 1249084800000,
  createdDateFormat: {
    year: "numeric",
  },
  releasedOn: ["halbkreis"],
} satisfies Song;
