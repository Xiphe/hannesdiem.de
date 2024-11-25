import { Song, people } from "../../meta";
import Lyrics from "./PidderLueng.mdx";

export default {
  type: "song",
  title: "Pidder Lüng",
  slug: "song/pidder-lueng",
  Lyrics,
  authors: [people.HannesDiem],
  createdDate: 1280620800000,
  createdDateFormat: {
    year: "numeric",
  },
  releasedOn: ["halbkreis"],
} satisfies Song;
