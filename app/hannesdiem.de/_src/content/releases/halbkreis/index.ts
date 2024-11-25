import { Release } from "@hd/content";
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
} from "@hd/content/meta/people";

export default {
  type: "release",
  title: "Halbkreis",
  slug: "halbkreis",
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
  ],
  tracks: [
    {
      title: "Alles Brennt",
      song: "/song/alles-brennt?version=halbkreis",
      duration: 229,
    },
    {
      title: "Bruder",
      addition: "(Hilf mir mein Freund)",
      song: "/song/bruder?version=halbkreis",
      duration: 250,
    },
    {
      title: "Die Mühle",
      addition: "(feat. Christina Düwel)",
      song: "/song/die-muehle?version=halbkreis",
      duration: 317,
    },
    {
      title: "Pidder Lüng",
      song: "/song/pidder-lueng?version=halbkreis",
      duration: 219,
    },
    {
      title: "Wie es mir Gefällt",
      song: "/song/wie-es-mir-gefaellt?version=halbkreis",
      duration: 365,
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
