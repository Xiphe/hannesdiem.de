import { Song, people } from "../../meta";
import Lyrics from "./Wiedergeboren_2024.mdx";

export default {
  type: "song",
  title: "Wiedergeboren",
  slug: "song/wiedergeboren",
  Lyrics,
  authors: [people.HannesDiem],
  createdDate: 1413064800000,
  createdDateFormat: {
    year: "numeric",
  },
  releasedOn: [],
} satisfies Song;
