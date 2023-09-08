import Link from "next/link";
import { SpotifyLogo } from "@/components";
import { buttonStyles, disabledButtonStyles } from "@/utils";
import { getSpotifyAccessToken, checkUsersSavedAlbums } from "./spotifyApi";
import clsx from "clsx";
import { PreSaveProps } from "@/content";
import NewWindowLink from "@/components/NewWindowLink";

export default async function SpotifyPreSaveButton({
  returnUrl,
  ...safe
}: PreSaveProps) {
  if (safe.type === "external") {
    return (
      <NewWindowLink className={buttonStyles} href={safe.link}>
        <SpotifyLogo
          className="max-h-12 xl:max-h-16"
          role="img"
          aria-label={"Pre-Save on Spotify"}
        />
      </NewWindowLink>
    );
  }

  const hasSaved = await hasPreSave(safe.id);

  if (hasSaved) {
    return (
      <span className={clsx(disabledButtonStyles, "flex gap-4")}>
        <SpotifyLogo className="max-h-12 xl:max-h-16 shrink-0" />
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
        className="max-h-12 xl:max-h-16"
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

    const [has] = await checkUsersSavedAlbums(accessToken, [albumId]);
    return has;
  } catch (err) {
    console.error(err);
    return false;
  }
}
