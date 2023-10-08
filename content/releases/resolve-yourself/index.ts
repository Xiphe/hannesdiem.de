import { Release } from "@/content";
import Description from "./description.mdx";
import {
  CarlAlbrecht,
  HannesDiem,
  IuliBanu,
  KhamkeoVilaysing,
  LanceAnderson,
  LeonWeickert,
  LindaLane,
} from "@/content/meta/people";

export default {
  type: "release",
  title: "Resolve Yourself",
  subtitle: "with Iuli Banu",
  slug: "resolve-yourself",
  releaseDate: 1700870400000,
  summary: "",
  cover: {
    src: "/cover/hannes_diem_resolve_yourself.png",
    alt: "Cover of Resolve Yourself",
    width: 4000,
    height: 4000,
  },
  genres: ["Funk", "Disco", "Electronic", "Pop"],
  languages: ["English"],
  Description,
  contributors: [
    {
      ...IuliBanu,
      roles: ["Spoken Word"],
    },
    {
      ...CarlAlbrecht,
      roles: [
        "Drums",
        "E-Guitar",
        "Bass",
        "Programming",
        "Mixing",
        "Mastering",
      ],
    },
    {
      ...LeonWeickert,
      roles: ["Cover Photography"],
    },
    {
      ...LindaLane,
      roles: ["Cover Photography"],
    },
    {
      ...KhamkeoVilaysing,
      roles: ["Cover Photography"],
    },
    {
      ...LanceAnderson,
      roles: ["Cover Photography"],
    },
    {
      ...HannesDiem,
      roles: [
        "Composition",
        "Lyrics",
        "Vocals",
        "E-Piano",
        "Hammond Organ",
        "Percussion",
        "Programming",
        "Mixing",
        "Graphic Design",
      ],
    },
  ],
  tracks: [
    {
      title: "Resolve Yourself",
      song: "/song/resolve-yourself?version=resolve-yourself",
      duration: 335,
    },
    {
      title: "Resolve Yourself",
      addition: "- Instrumental",
      duration: 335,
    },
  ],
  preSaves: [],
  shops: [],
} satisfies Release;
