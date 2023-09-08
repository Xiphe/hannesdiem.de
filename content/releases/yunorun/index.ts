import { Release } from "@/content";
import Description from "./description.mdx";
import { CarlAlbrecht, HannesDiem } from "@/content/meta/people";

export default {
  type: "release",
  title: "Y U NO RUN?",
  releaseDate: 1695343600000,
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
      link: "https://accounts.spotify.com/authorize?response_type=code&client_id=089f7b64ea634ac696028a96cd1266ae&scope=user-library-modify,user-read-email&redirect_uri=https%3A%2F%2Fmusic.imusician.pro%2Fpresave%2Fspotify%2F",
    },
    {
      service: "deezer",
      type: "external",
      link: "https://connect.deezer.com/oauth/auth.php?app_id=531842&redirect_uri=https%3A%2F%2Fmusic.imusician.pro%2Fpresave%2Fdeezer%2F&perms=basic_access,email,offline_access,manage_library",
    },
  ],
  shops: [],
} satisfies Release;
