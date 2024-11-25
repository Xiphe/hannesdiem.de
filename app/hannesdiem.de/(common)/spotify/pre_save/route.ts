import {
  getSpotifyAccessToken,
  initiateSpotifyLogin,
  saveSpotifyAlbumsForUser,
} from "@hd/utils/spotify";
import { safeRedirect } from "@utils/safeRedirect";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const id = url.searchParams.get("album_id");

  if (!id) {
    return NextResponse.json({ error: "Not Found" }, { status: 404 });
  }

  const loginStatus = url.searchParams.get("spotify_login_status");
  const returnUrl = await safeRedirect(url.searchParams.get("return_uri"));
  const accessToken = await getSpotifyAccessToken();

  if (!accessToken) {
    /* prevent infinite auth loop */
    if (loginStatus) {
      const nextUrl = new URL(returnUrl);
      nextUrl.searchParams.append("spotify_login_status", loginStatus);

      return NextResponse.redirect(nextUrl, {
        status: 302,
      });
    }

    const successRedirect = new URL(url.origin);
    successRedirect.pathname = url.pathname;
    successRedirect.searchParams.append("return_uri", returnUrl);
    successRedirect.searchParams.append("album_id", id);

    return initiateSpotifyLogin({
      successUrl: successRedirect.toString(),
      errorUrl: returnUrl,
    });
  }

  await saveSpotifyAlbumsForUser(accessToken, [id]);

  const nextUrl = new URL(returnUrl);
  nextUrl.searchParams.append("spotify_pre_save_status", "success");
  return NextResponse.redirect(nextUrl, { status: 302 });
}
