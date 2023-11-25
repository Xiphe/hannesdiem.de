import { Release } from "@/content";
import Description from "./description.mdx";
import { CarlAlbrecht, HannesDiem } from "@/content/meta/people";

export default {
  type: "release",
  title: "Y U NO RUN?",
  slug: "yunorun",
  releaseDate: 1695340800000,
  summary:
    '"Y U NO RUN?" delves into the intricate relationship between the logical mind and emotional heart, examining the pitfalls of perfectionism and the challenge of slowing down amidst life\'s momentum. The single questions why seemingly simple choices can be so complex to make, offering an introspective look into the struggles of decision-making.',
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
  tracks: [
    {
      title: "Y U NO RUN?",
      song: "/song/yunorun?version=yunorun",
      duration: 323,
    },
    {
      title: "Y U NO RUN?",
      addition: "- Instrumental",
      duration: 323,
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
    { type: "amazonmusic", link: "https://music.amazon.de/albums/B0CG24X1LZ" },
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
      type: "qobuz",
      link: "https://open.qobuz.com/album/rxakr0icosv1b",
    },
    {
      type: "youtubemusic",
      link: "https://music.youtube.com/channel/MPREb_TpleMTdz5FA",
    },
    { type: "awa", link: "https://s.awa.fm/album/ee59d3120aff3d0e4f71" },
  ],
} satisfies Release;
