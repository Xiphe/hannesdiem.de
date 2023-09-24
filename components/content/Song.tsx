import { Song } from "@/content";
import { getOrigin } from "@/utils";
import { Metadata, ResolvingMetadata } from "next";
import { Letter } from "../Letter";

export async function generateSongMetadata(
  song: Song,
  searchParams: Record<string, string | string[]>,
  parent: ResolvingMetadata
) {
  const url = new URL(getOrigin());
  url.pathname = song.slug;

  const description =
    song.summary ||
    `A text written by ${(song.authors || [])
      .map(({ name }) => name)
      .join(", ")}`;

  return {
    title: song.title,
    description,
    openGraph: {
      title: song.title,
      description,
      type: "music.song",
      url: url.href,
    },
  } satisfies Metadata;
}

export function Song({
  title,
  subtitle,
  Description,
  Lyrics = () => null,
  createdDate,
  createdDateFormat = {
    year: "numeric",
    month: "long",
  },
  authors,
  releasedOn,
}: Song & {
  searchParams: Record<string, string | string[]>;
}) {
  return (
    <div>
      <Letter
        title={title}
        subtitle={subtitle}
        TitleComponent="h1"
        createdDate={createdDate}
        createdDateFormat={createdDateFormat}
        authors={authors}
      >
        <Lyrics />
      </Letter>
    </div>
  );
}
