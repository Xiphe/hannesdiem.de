import { NextResponse } from "next/server";
import {
  cookies,
  requestSpotifyAccessToken,
  setSpotifyUserTokenData,
  SPOTIFY_STATUS,
  isSpotifyStatus,
} from "@/utils";
import { randomBytes, randomUUID } from "crypto";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const cookie = cookies.spotifyLogin.get();
  cookies.spotifyLogin.delete();

  if (!cookie) {
    return NextResponse.json(
      { status: SPOTIFY_STATUS.COOKIE_MISSING },
      { status: 400 }
    );
  }

  try {
    const returnState = url.searchParams.get("state");

    if (returnState !== cookie.state) {
      throw SPOTIFY_STATUS.STATE_MISMATCH;
    }

    const error = url.searchParams.get("error");

    if (error) {
      const nextUrl = new URL(cookie.errorUrl);
      nextUrl.searchParams.append("spotify_login_status", error);
      return NextResponse.redirect(nextUrl, { status: 302 });
    }

    const code = url.searchParams.get("code")?.trim();

    if (!code) {
      throw SPOTIFY_STATUS.CODE_MISSING;
    }

    const spotifyTokenData = await requestSpotifyAccessToken({ code });
    const spotifyAuthId = randomUUID();
    const encryptionKey = randomBytes(32);

    await setSpotifyUserTokenData(spotifyAuthId, encryptionKey, {
      accessToken: spotifyTokenData.access_token,
      refreshToken: spotifyTokenData.refresh_token,
      scope: spotifyTokenData.scope,
      validUntil: Date.now() + (spotifyTokenData.expires_in - 60) * 1000,
    });

    cookies.spotifyAuth.set({
      id: spotifyAuthId,
      encryptionKey: encryptionKey.toString("hex"),
    });

    const nextUrl = new URL(cookie.successUrl);
    nextUrl.searchParams.append("spotify_login_status", SPOTIFY_STATUS.SUCCESS);
    return NextResponse.redirect(nextUrl, { status: 302 });
  } catch (err) {
    if (isSpotifyStatus(err)) {
      const nextUrl = new URL(cookie.errorUrl);
      nextUrl.searchParams.append("spotify_login_status", err);
      return NextResponse.redirect(nextUrl, { status: 302 });
    }

    return NextResponse.json(
      { error: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }
}
