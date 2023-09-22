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
  shops: [
    { type: "amazonmusic", link: "https://music.amazon.de/albums/B0CG27MGT3" },
    { type: "deezer", link: "https://www.deezer.com/album/477996575" },
    { type: "tidal", link: "https://www.tidal.com/album/311632173" },
    {
      type: "spotify",
      link: "https://open.spotify.com/album/14t6dx7ZvRGjKucQwJftrM",
    },
    {
      type: "applemusic",
      link: "https://geo.music.apple.com/album/y-u-no-run-single/1703273342?app=music",
    },
    {
      type: "pandora",
      link: "https://www.pandora.com/artist/hannes-diem/y-u-no-run/AL9V67pb7X2KcJ4",
    },
    {
      type: "youtubemusic",
      link: "https://music.youtube.com/channel/MPREb_TpleMTdz5FA",
    },
    { type: "awa", link: "https://s.awa.fm/album/ee59d3120aff3d0e4f71" },
  ],
} satisfies Release;
