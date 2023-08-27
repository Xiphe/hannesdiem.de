import { ComponentType } from "react";

export interface Image {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface Contributor {
  name: string;
  link?: string;
  roles: string[];
  description?: string;
}

export type ShopType =
  | "amazonmusic"
  | "deezer"
  | "qobuz"
  | "tidal"
  | "spotify"
  | "anghami"
  | "applemusic"
  | "pandora"
  | "youtubemusic"
  | "awa";

/*
Script to extract shop links from the imusician website:
JSON.stringify(Array.from(document.querySelectorAll('[data-component="shop-link"]')).map((link) => ({ type: link.dataset.shop, link: link.getAttribute('href') })))
*/
export interface Shop {
  type: ShopType;
  link: string;
}

export interface Release {
  type: "release";
  title: string;
  artist?: string;
  releaseDate: number;
  releaseDateFormat?: Intl.DateTimeFormatOptions;
  cover: Image;
  genres: string[];
  languages: string[];
  Description?: ComponentType;
  contributors: Contributor[];
  shops: Shop[];
}

export type Post = Release;
