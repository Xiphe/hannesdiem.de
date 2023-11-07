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
  summary:
    '"Resolve Yourself" is a musical journey through diverse emotional landscapes, blending danceable grooves with introspective meditations. Inspired by a serene walk in Tarifa and shaped by collaborations with emotional coach Iuli Banu and musician CArl, the song invites listeners to explore self-awareness in a joyful, rhythmic way',
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
  preSaves: [
    {
      "type": "internal",
      "service": "spotify",
      "id": "1JHlS2iQP5EU8UPAMOCA8q"
    },
    {
      "type": "external",
      "seevice": "deezer",
      "link": "https://music.imusician.pro/a/GzLz-DoC"
    }
  ],
  shops: [],
} satisfies Release;
