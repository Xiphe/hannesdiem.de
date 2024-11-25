import { ComponentPropsWithRef, ComponentType } from "react";
import { ShopType } from "./types";
import {
  AmazonMusicLogo,
  SpotifyLogo,
  DeezerLogo,
  TidalLogo,
  AppleMusicLogo,
  YouTubeMusicLogo,
  PandoraLogo,
  AnghamiLogo,
  AwaLogo,
  QobuzLogo,
  SoundCloudLogo,
} from "@/components/logos";

export const shops: Record<
  ShopType,
  { name: string; Logo: ComponentType<ComponentPropsWithRef<"svg">> }
> = {
  spotify: {
    name: "Spotify",
    Logo: SpotifyLogo,
  },
  deezer: {
    name: "Deezer",
    Logo: DeezerLogo,
  },
  applemusic: {
    name: "Apple Music",
    Logo: AppleMusicLogo,
  },
  tidal: {
    name: "Tidal",
    Logo: TidalLogo,
  },
  amazonmusic: {
    name: "Amazon Music",
    Logo: AmazonMusicLogo,
  },
  youtubemusic: {
    name: "YouTube Music",
    Logo: YouTubeMusicLogo,
  },
  pandora: {
    name: "Pandora",
    Logo: PandoraLogo,
  },
  anghami: {
    name: "Anghami",
    Logo: AnghamiLogo,
  },
  awa: {
    name: "Awa",
    Logo: AwaLogo,
  },
  qobuz: {
    name: "Qobuz",
    Logo: QobuzLogo,
  },
  soundcloud: {
    name: "SoundCloud",
    Logo: SoundCloudLogo,
  },
};
