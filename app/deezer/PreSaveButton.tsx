import { DeezerLogo } from "@/components";
import { buttonStyles } from "@/utils";
import { PreSaveProps } from "@/content";
import NewWindowLink from "@/components/NewWindowLink";

export default async function SpotifyPreSaveButton({
  returnUrl,
  ...safe
}: PreSaveProps) {
  if (safe.type === "external") {
    return (
      <NewWindowLink className={buttonStyles} href={safe.link}>
        <DeezerLogo
          className="h-screen max-h-10 xl:max-h-14"
          role="img"
          aria-label={"Pre-Save on Deezer"}
        />
      </NewWindowLink>
    );
  }

  return null;
}
