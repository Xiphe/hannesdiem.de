import assert from "assert";

assert(process.env.SPOTIFY_CLIENT_ID, "SPOTIFY_CLIENT_ID is not set");
assert(process.env.COOKIE_ENCRYPTION_KEY, "COOKIE_ENCRYPTION_KEY is not set");
assert(process.env.SPOTIFY_CLIENT_SECRET, "SPOTIFY_CLIENT_SECRET is not set");

export const env = {
  SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
  COOKIE_ENCRYPTION_KEY: process.env.COOKIE_ENCRYPTION_KEY,
  SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET,
};
