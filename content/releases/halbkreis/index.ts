import { Release } from "@/content";
import Description from "./description.mdx";
import {
  AlexHenke,
  AndreVonMalotki,
  AxelFeige,
  CarlAlbrecht,
  ChristinaDuewel,
  HannesDiem,
  JanEricKohrs,
  PeterBischoff,
} from "@/content/meta/people";

export default {
  type: "release",
  title: "Halbkreis",
  releaseDate: 1280613600000,
  releaseDateFormat: { year: "numeric", month: "long" },
  cover: {
    src: "/cover/hannes_diem_halbkreis.jpg",
    alt: "Cover of Halbkreis",
    width: 4000,
    height: 4000,
  },
  genres: ["Gothic", "Rock", "Pop"],
  languages: ["German"],
  Description,
  contributors: [
    {
      ...HannesDiem,
      roles: [
        "Composition",
        "Lyrics",
        "Vocals",
        "Piano",
        "Drums",
        "Programming",
        "Mixing",
      ],
    },
    {
      ...ChristinaDuewel,
      roles: ["Vocals"],
    },
    {
      ...AxelFeige,
      roles: ["Bass"],
    },
    {
      ...AndreVonMalotki,
      roles: ["Acoustic Guitar"],
    },
    {
      ...AlexHenke,
      roles: ["Electric Guitar"],
    },
    {
      ...JanEricKohrs,
      roles: ["Producer", "Programming", "Keyboards", "Mixing", "Arrangement"],
    },
    {
      ...CarlAlbrecht,
      roles: ["Mastering"],
    },
    {
      ...PeterBischoff,
      roles: ["Label"],
    },
  ],
  shops: [
    { type: "amazonmusic", link: "https://music.amazon.de/albums/B0C28MJSZJ" },
    { type: "deezer", link: "https://www.deezer.com/album/429098327" },
    { type: "qobuz", link: "https://open.qobuz.com/album/bfom4akyiktqb" },
    { type: "tidal", link: "https://www.tidal.com/album/288761084" },
    {
      type: "spotify",
      link: "https://open.spotify.com/album/2nN3R1FfMPEJejLUlvx3rm",
    },
    { type: "anghami", link: "https://play.anghami.com/album/1038212362" },
    {
      type: "applemusic",
      link: "https://geo.music.apple.com/album/halbkreis-ep/1682033714?app=music",
    },
    {
      type: "pandora",
      link: "https://www.pandora.com/artist/hannes-diem/halbkreis/ALwpVnhhqwkbmvP",
    },
    {
      type: "youtubemusic",
      link: "https://music.youtube.com/channel/MPREb_9mn2Xuk7ISn",
    },
    { type: "awa", link: "https://s.awa.fm/album/bd25e2cb9d989b8f6d35" },
  ],
} satisfies Release;
