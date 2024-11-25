import { DeezerLogo } from "@hd/components";
import { buttonStyles } from "@hd/utils/styles";
import { PreSaveProps } from "@hd/content";
import Link from "next/link";

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
        <DeezerLogo
          className="h-screen max-h-9 xl:max-h-12 my-1.5 xl:my-2"
          role="img"
          aria-label={"Pre-Save on Deezer"}
        />
      </Link>
    );
  }

  return null;
}
