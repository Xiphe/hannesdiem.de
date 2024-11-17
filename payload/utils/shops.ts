export const SHOPS = [
  "amazonmusic" as const,
  "deezer" as const,
  "qobuz" as const,
  "tidal" as const,
  "spotify" as const,
  "anghami" as const,
  "applemusic" as const,
  "pandora" as const,
  "youtubemusic" as const,
  "awa" as const,
  "soundcloud" as const,
];

export type ShopSlugs = (typeof SHOPS)[number];
