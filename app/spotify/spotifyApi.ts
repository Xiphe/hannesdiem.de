import { decrypt, encrypt, env, getOrigin } from "@/utils";
import { kv } from "@vercel/kv";
import { spotifyAuth, spotifyLogin } from "@/utils/cookies";
import { randomBytes } from "crypto";
import { NextResponse } from "next/server";
import zod from "zod";
import { SPOTIFY_STATUS } from "./status";

const SpotifyTokenSchema = zod.object({
  access_token: zod.string().nonempty(),
  token_type: zod.string().nonempty(),
  scope: zod.string().nonempty(),
  expires_in: zod.number().gte(0),
  refresh_token: zod.string().nonempty(),
});
export type SpotifyToken = zod.infer<typeof SpotifyTokenSchema>;

const SpotifyRefreshedTokenSchema = SpotifyTokenSchema.omit({
  refresh_token: true,
});
export type SpotifyRefreshedToken = zod.infer<
  typeof SpotifyRefreshedTokenSchema
>;

interface GetSpotifyLoginUrlOpts {
  scope?: string;
  state: string;
}

export function getSpotifyLoginUrl({
  scope = "user-library-modify user-library-read user-read-email",
  state,
}: GetSpotifyLoginUrlOpts) {
  const url = new URL("https://accounts.spotify.com/authorize");

  url.searchParams.append("response_type", "code");
  url.searchParams.append("client_id", env.SPOTIFY_CLIENT_ID);
  url.searchParams.append("scope", scope);
  url.searchParams.append("show_dialog", "true");
  url.searchParams.append(
    "redirect_uri",
    `${getOrigin()}/spotify/login_callback`
  );
  url.searchParams.append("state", state);

  return url.toString();
}

export interface InitiateSpotifyLoginOpts {
  successUrl: string;
  errorUrl: string;
  scope?: string;
}

export function initiateSpotifyLogin({
  successUrl,
  errorUrl,
  scope,
}: InitiateSpotifyLoginOpts) {
  const state = randomBytes(32).toString("hex");

  spotifyLogin.set({
    state,
    successUrl,
    errorUrl,
  });

  return NextResponse.redirect(getSpotifyLoginUrl({ scope, state }), {
    status: 302,
  });
}

interface RequestAccessTokenOpts {
  code: string;
}

export async function requestAccessToken({ code }: RequestAccessTokenOpts) {
  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: `${getOrigin()}/spotify/login_callback`,
    }),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(
        `${env.SPOTIFY_CLIENT_ID}:${env.SPOTIFY_CLIENT_SECRET}`
      ).toString("base64")}`,
    },
  });

  if (!res.ok) {
    throw SPOTIFY_STATUS.CODE_EXCHANGE_FAILED;
  }

  const spotifyTokenData = SpotifyTokenSchema.safeParse(await res.json());

  if (!spotifyTokenData.success) {
    throw SPOTIFY_STATUS.CODE_EXCHANGE_INVALID;
  }

  return spotifyTokenData.data;
}

export async function getSpotifyAccessToken() {
  try {
    const spotifyAuthData = spotifyAuth.get();

    if (!spotifyAuthData) {
      return undefined;
    }

    const userTokenData = await getUserTokenData(
      spotifyAuthData.id,
      Buffer.from(spotifyAuthData.encryptionKey, "hex")
    );

    if (!userTokenData) {
      return undefined;
    }

    if (Date.now() > userTokenData.validUntil) {
      const refreshedTokenData = await refreshToken(userTokenData);

      await setUserTokenData(
        spotifyAuthData.id,
        Buffer.from(spotifyAuthData.encryptionKey, "hex"),
        {
          accessToken: refreshedTokenData.access_token,
          refreshToken: userTokenData.refreshToken,
          scope: refreshedTokenData.scope,
          validUntil: Date.now() + (refreshedTokenData.expires_in - 60) * 1000,
        }
      );

      return refreshedTokenData.access_token;
    }

    return userTokenData.accessToken;
  } catch (err) {
    console.error(err);
    return undefined;
  }
}

export async function refreshToken(userTokenData: SpotifyUserTokenData) {
  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: userTokenData.refreshToken,
    }),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(
        `${env.SPOTIFY_CLIENT_ID}:${env.SPOTIFY_CLIENT_SECRET}`
      ).toString("base64")}`,
    },
  });

  if (!res.ok) {
    throw SPOTIFY_STATUS.TOKEN_REFRESH_FAILED;
  }

  const spotifyTokenData = SpotifyRefreshedTokenSchema.safeParse(
    await res.json()
  );

  if (!spotifyTokenData.success) {
    throw SPOTIFY_STATUS.TOKEN_REFRESH_INVALID;
  }

  return spotifyTokenData.data;
}

export async function saveAlbumsForUser(accessToken: string, albums: string[]) {
  const res = await fetch("https://api.spotify.com/v1/me/albums", {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ids: albums,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to save albums");
  }

  return true;
}

const SpotifyCheckSavedAlbumsSchema = zod.array(zod.boolean());

export async function checkUsersSavedAlbums(
  accessToken: string,
  albums: string[]
) {
  const url = new URL("https://api.spotify.com/v1/me/albums/contains");
  url.searchParams.append("ids", albums.join(","));
  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    throw new Error(
      `Failed to get saved albums(${res.status}): ${await res
        .text()
        .catch(() => "unknown error")}`
    );
  }

  return SpotifyCheckSavedAlbumsSchema.parse(await res.json());
}

export const SpotifyUserTokenDataSchema = zod.object({
  accessToken: zod.string().nonempty(),
  scope: zod.string().nonempty(),
  validUntil: zod.number().gte(0),
  refreshToken: zod.string().nonempty(),
});
export type SpotifyUserTokenData = zod.infer<typeof SpotifyUserTokenDataSchema>;

export async function setUserTokenData(
  id: string,
  encryptionKey: Buffer,
  data: SpotifyUserTokenData
) {
  const cypher = encrypt(JSON.stringify(data), encryptionKey);
  await kv.set(`SPOTIFY_AUTH:${id}`, cypher, { ex: 60 * 60 * 24 * 365 });
}

export async function getUserTokenData(id: string, encryptionKey: Buffer) {
  const cypher = await kv.get(`SPOTIFY_AUTH:${id}`);
  if (typeof cypher !== "string") {
    return undefined;
  }
  const plaintext = decrypt(cypher, encryptionKey);

  return SpotifyUserTokenDataSchema.parse(JSON.parse(plaintext));
}
