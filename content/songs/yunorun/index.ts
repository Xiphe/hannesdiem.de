import { Song } from "@/content/meta";
import Lyrics from "./YUNORUN.mdx";
import { HannesDiem } from "@/content/meta/people";

export default {
  type: "song",
  title: "Y U NO RUN?",
  slug: "song/yunorun",
  Lyrics,
  authors: [HannesDiem],
  createdDate: 1675209600000,
  releasedOn: ["yunorun"],
} satisfies Song;
