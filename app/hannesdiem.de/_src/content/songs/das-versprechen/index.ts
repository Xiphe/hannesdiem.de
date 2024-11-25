import { Song, people } from "../../meta";
import Lyrics from "./Das Versprechen.mdx";

export default {
  type: "song",
  title: "Das Versprechen",
  slug: "song/das-versprechen",
  Lyrics,
  authors: [people.HannesDiem, people.ChristinaDuewel],
  createdDate: 1409436000000,
  createdDateFormat: {
    year: "numeric",
  },
  releasedOn: [],
} satisfies Song;
