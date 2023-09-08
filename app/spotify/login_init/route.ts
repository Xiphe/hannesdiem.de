import { safeRedirect } from "@/utils/safeRedirect";
import { NextResponse } from "next/server";
import { randomBytes } from "node:crypto";
import { spotifyLogin } from "@/utils/cookies";
import { getSpotifyLoginUrl } from "../spotifyApi";

export async function POST(request: Request) {
  const formData = await request.formData();
  const successRedirect = formData.get("success_redirect");
  const errorRedirect = formData.get("error_redirect");
  let scope: FormDataEntryValue | undefined =
    formData.get("scope") || undefined;
  if (typeof scope !== "string") {
    scope = undefined;
  }

  const state = randomBytes(16).toString("hex");

  spotifyLogin.set({
    state,
    successUrl: safeRedirect(successRedirect),
    errorUrl: safeRedirect(errorRedirect),
  });

  return NextResponse.redirect(getSpotifyLoginUrl({ scope, state }), {
    status: 302,
  });
}
