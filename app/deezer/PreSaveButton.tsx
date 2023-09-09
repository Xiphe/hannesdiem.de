import { DeezerLogo } from "@/components";
import { buttonStyles } from "@/utils";
import { PreSaveProps } from "@/content";

export default async function SpotifyPreSaveButton({
  returnUrl,
  ...safe
}: PreSaveProps) {
  if (safe.type === "external") {
    return (
      <a className={buttonStyles} href={safe.link}>
        <DeezerLogo
          className="h-screen max-h-9 xl:max-h-12 my-1.5 xl:my-2"
          role="img"
          aria-label={"Pre-Save on Deezer"}
        />
      </a>
    );
  }

  return null;
}
