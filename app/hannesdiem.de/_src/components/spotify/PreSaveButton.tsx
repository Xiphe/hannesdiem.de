import Link from "next/link";
import { SpotifyLogo } from "../logos";
import { buttonStyles, disabledButtonStyles } from "@hd/utils/styles";
import clsx from "clsx";
import { type PreSaveProps } from "@hd/content";
import {
  checkSpotifyUsersSavedAlbums,
  getSpotifyAccessToken,
} from "@hd/utils/spotify";

export default async function SpotifyPreSaveButton({
  returnUrl,
  ...safe
}: PreSaveProps) {
  if (safe.type === "external") {
    return (
      <Link
        className={buttonStyles}
        href={safe.link}
        target="_blank"
        rel="noopener noreferrer"
      >
        <SpotifyLogo
          className="h-screen max-h-12 xl:max-h-16"
          role="img"
          aria-label={"Pre-Save on Spotify"}
        />
      </Link>
    );
  }

  const hasSaved = await hasPreSave(safe.id);

  if (hasSaved) {
    return (
      <span className={clsx(disabledButtonStyles, "flex gap-4")}>
        <SpotifyLogo className="h-screen max-h-12 xl:max-h-16 shrink-0" />
        <span className="block h-full p-2">
          <span className="block border-l-2 border-current h-full" />
        </span>
        <span className="whitespace-nowrap">Saved ✓</span>
      </span>
    );
  }

  const params = new URLSearchParams();
  params.set("return_uri", returnUrl);
  params.set("album_id", safe.id);

  return (
    <Link
      href={`/spotify/pre_save?${params.toString()}`}
      className={buttonStyles}
    >
      <SpotifyLogo
        className="h-screen max-h-12 xl:max-h-16"
        role="img"
        aria-label={"Pre-Save on Spotify"}
      />
    </Link>
  );
}

async function hasPreSave(albumId: string) {
  try {
    const accessToken = await getSpotifyAccessToken();

    if (!accessToken) {
      return false;
    }

    const [has] = await checkSpotifyUsersSavedAlbums(accessToken, [albumId]);
    return has;
  } catch (err) {
    console.error(err);
    return false;
  }
}
