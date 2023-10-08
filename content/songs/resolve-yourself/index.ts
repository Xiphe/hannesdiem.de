import { Song } from "@/content/meta";
import Lyrics from "./ResolveYourself.mdx";
import { HannesDiem } from "@/content/meta/people";

export default {
  type: "song",
  title: "Resolve Yourself",
  slug: "song/resolve-yourself",
  Lyrics,
  authors: [HannesDiem],
  createdDate: 1686787200000,
  releasedOn: ["resolve-yourself"],
} satisfies Song;
