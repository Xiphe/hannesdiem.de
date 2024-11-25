import { cookies, type UnsafeUnwrappedCookies } from "next/headers";
import { decrypt, encrypt } from "../../../(common)/utils/encrypt";
import { env } from "./env";
import zod from "zod";

const encryptionKey = Buffer.from(env.COOKIE_ENCRYPTION_KEY, "hex");

async function set(name: string, data: unknown) {
  return (await cookies()).set(
    name,
    encrypt(JSON.stringify(data), encryptionKey),
    {
      secure: true,
    },
  );
}

async function del(name: string) {
  return (await cookies()).set(name, "", {
    maxAge: 0,
    secure: true,
  });
}

async function read(name: string) {
  const cookie = (await cookies()).get(name);
  if (!cookie) {
    return undefined;
  }
  const { value } = cookie;
  return JSON.parse(decrypt(value, encryptionKey));
}

export const SpotifyLoginCookieSchema = zod.object({
  state: zod.string().nonempty(),
  successUrl: zod.string().nonempty(),
  errorUrl: zod.string().nonempty(),
});
export type SpotifyLoginCookie = zod.infer<typeof SpotifyLoginCookieSchema>;

export const spotifyLogin = {
  set(state: SpotifyLoginCookie) {
    return set("spotify_login", state);
  },
  get() {
    const data = read("spotify_login");

    return !data ? undefined : SpotifyLoginCookieSchema.parse(data);
  },
  delete() {
    return del("spotify_login");
  },
};

export const SpotifyAuthCookieSchema = zod.object({
  id: zod.string().nonempty(),
  encryptionKey: zod.string().nonempty(),
});
export type SpotifyAuthCookie = zod.infer<typeof SpotifyAuthCookieSchema>;

export const spotifyAuth = {
  set(state: SpotifyAuthCookie) {
    return set("spotify_auth", state);
  },
  get() {
    const data = read("spotify_auth");

    return !data ? undefined : SpotifyAuthCookieSchema.parse(data);
  },
  delete() {
    return del("spotify_auth");
  },
};
