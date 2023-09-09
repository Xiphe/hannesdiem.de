import { Release } from "@/content";
import Description from "./description.mdx";
import { CarlAlbrecht, HannesDiem } from "@/content/meta/people";

export default {
  type: "release",
  title: "Y U NO RUN?",
  releaseDate: 1695340800000,
  cover: {
    src: "/cover/hannes_diem_yunorun.png",
    alt: "Cover of Y U NO RUN?",
    width: 4000,
    height: 4000,
  },
  genres: ["Industrial", "EBM", "Electro"],
  languages: ["English"],
  Description,
  contributors: [
    {
      ...CarlAlbrecht,
      roles: ["Programming", "Mixing", "Mastering"],
    },
    {
      ...HannesDiem,
      roles: [
        "Composition",
        "Lyrics",
        "Vocals",
        "Piano",
        "Programming",
        "Mixing",
      ],
    },
  ],
  preSaves: [
    { service: "spotify", type: "internal", id: "14t6dx7ZvRGjKucQwJftrM" },
    {
      service: "spotify",
      type: "external",
      link: "https://music.imusician.pro/a/wMv-0eI1",
    },
    {
      service: "deezer",
      type: "external",
      link: "https://music.imusician.pro/a/wMv-0eI1",
    },
  ],
  shops: [],
} satisfies Release;
