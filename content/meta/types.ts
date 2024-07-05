import { MDXContent } from "mdx/types";
import { ComponentType, ReactNode } from "react";

export interface Image {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface Person {
  name: string;
  link?: string;
  ogProfile?: string;
}

export interface Contributor extends Person {
  roles: string[];
  description?: string;
}

export interface Author extends Person {
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
  | "awa"
  | "soundcloud";

/*
Script to extract shop links from the imusician website:
JSON.stringify(Array.from(document.querySelectorAll('[data-component="shop-link"]')).map((link) => ({ type: link.dataset.shop, link: link.getAttribute('href') })))
*/
export interface Shop {
  type: ShopType;
  link: string;
}

export type PreSaveService = "spotify" | "deezer";

export interface PreSave {
  service: PreSaveService;
  type: "internal";
  id: string;
}

export interface ExternalPreSave {
  service: PreSaveService;
  type: "external";
  link: string;
}

export type PreSaveProps =
  | { returnUrl: string } & (
      | Omit<PreSave, "service">
      | Omit<ExternalPreSave, "service">
    );

export interface Song {
  type: "song";
  title: string;
  subtitle?: string;
  slug: `song/${string}`;
  summary?: string;
  authors?: Author[];
  createdDate: number;
  createdDateFormat?: Intl.DateTimeFormatOptions;
  Lyrics?: ComponentType;
  Description?: ComponentType;
  releasedOn?: string[];
}

export interface Track {
  title: string;
  addition?: string;
  song?: string;
  duration: number;
}

export interface Release {
  type: "release";
  title: string;
  subtitle?: string;
  slug: string;
  artist?: string;
  releaseDate: number;
  releaseDateFormat?: Intl.DateTimeFormatOptions;
  cover: Image;
  genres: string[];
  languages: string[];
  summary?: string;
  Description?: ComponentType;
  contributors: Contributor[];
  tracks: Track[];
  shops: Shop[];
  preSaves?: (PreSave | ExternalPreSave)[];
}

export interface Page {
  type: "page";
  title: string;
  cta?: {
    href: string;
    children: ReactNode;
  };
  externalTitle?: string;
  banner?: Image;
  subtitle?: string;
  slug: string;
  description: string;
  date?: number;
  dateFormat?: Intl.DateTimeFormatOptions;
  Content: MDXContent;
}

export type Post = Release | Song | Page;
