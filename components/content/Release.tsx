import { Metadata, ResolvingMetadata } from "next";
import { ComponentType, Fragment } from "react";
import Image from "next/image";
import clsx from "clsx";
import {
  PreSaveProps,
  PreSaveService,
  Release,
  shops as shopTypes,
} from "@/content";
import {
  buttonStyles,
  exists,
  focusStyles,
  getOrigin,
  proseStyles,
  secondsToDuration,
} from "@/utils";
import SpotifyPreSaveButton from "@/app/spotify/PreSaveButton";
import DeezerPreSaveButton from "@/app/deezer/PreSaveButton";
import { LocalTime } from "../LocalTime";

const PreSaveButtons: Record<PreSaveService, ComponentType<PreSaveProps>> = {
  spotify: SpotifyPreSaveButton,
  deezer: DeezerPreSaveButton,
};
const shopOrder = Object.keys(shopTypes);

export async function generateReleaseMetadata(
  release: Release,
  searchParams: Record<string, string | string[]>,
  parent: ResolvingMetadata
) {
  const url = new URL(getOrigin());
  url.pathname = release.slug;

  const image = new URL(getOrigin());
  const imageHeight = Math.min(release.cover.height, 1200);
  const imageRatio = release.cover.width / release.cover.height;
  const imageWidth = imageHeight * imageRatio;

  image.pathname = "/_next/image";
  image.searchParams.set("url", release.cover.src);
  image.searchParams.set("w", String(imageHeight));
  image.searchParams.set("h", String(imageWidth));
  image.searchParams.set("q", "75");

  return {
    title: release.title,
    description: release.summary,
    openGraph: {
      title: release.title,
      description: release.summary,
      images: {
        url: image.href,
        width: imageWidth,
        height: imageHeight,
        alt: `Cover of "${release.title}"`,
      },
      type: "music.album",
      url: url.href,
      musicians: release.contributors
        .map(({ ogProfile }) => ogProfile)
        .filter(exists),
      songs: release.tracks.map(({ song }) => song).filter(exists),
    },
  } satisfies Metadata;
}

export function Release({
  cover,
  title,
  subtitle,
  artist,
  releaseDate,
  releaseDateFormat,
  genres,
  languages,
  Description,
  contributors,
  shops,
  preSaves = [],
  slug,
  tracks,
  searchParams,
}: Release & {
  searchParams: Record<string, string | string[]>;
}) {
  const preSavePreview = Boolean(searchParams.presave_preview);

  return (
    <div className="container max-w-screen-xl mx-auto pb-8">
      <div className="gap-6 lg:gap-16 sm:p-6 md:flex mb-4">
        <div className="w-full md:w-1/2 shrink-0">
          <div
            className="sm:rounded-lg overflow-hidden relative  sm:shadow-md shadow-black"
            style={{ aspectRatio: `${cover.width} / ${cover.height}` }}
          >
            <Image
              priority
              src={cover.src}
              alt={cover.alt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
        <div className="flex flex-col-reverse md:flex-col gap-12 w-full p-6 sm:px-0 md:pt-0">
          <div className={proseStyles}>
            <h1 className={subtitle ? "!mb-0" : ""}>
              {artist ? <>{artist} - </> : null}
              {title}
            </h1>
            {subtitle ? (
              <h2 className="!text-3xl !font-normal !mt-2">{subtitle}</h2>
            ) : null}
            <p>
              <span className="opacity-60">
                {releaseDate > Date.now() ? "Release" : "Released"}:{" "}
              </span>
              <LocalTime timeStamp={releaseDate} format={releaseDateFormat} />
              <br />
              <span className="opacity-60">Genre: </span>
              {genres.join(", ")}
              <br />
              <span className="opacity-60">Language: </span>
              {languages.join(", ")}
            </p>
            {tracks.length ? (
              <>
                <h3>Tracklist</h3>
                <div role="table" className="table w-full">
                  <div role="rowgroup" className="sr-only">
                    <div role="row">
                      <span role="columnheader">Song Nr.</span>
                      <span role="columnheader">Title</span>
                      <span role="columnheader">Duration</span>
                    </div>
                  </div>
                  <div role="rowgroup" className="table-row-group">
                    {tracks.map(({ title, addition, duration, song }, i) => {
                      const Comp = song ? "a" : "div";

                      return (
                        <Comp
                          role="row"
                          className={clsx(
                            focusStyles,
                            "table-row no-underline bg-purple-400 dark:bg-blue-400",
                            i % 2 === 0
                              ? "bg-opacity-5 dark:bg-opacity-5"
                              : "bg-opacity-10 dark:bg-opacity-10",
                            song ? "hover:bg-opacity-20" : ""
                          )}
                          key={title + addition}
                          href={song}
                          title={
                            song
                              ? `Details and Lyrics for "${title}"`
                              : undefined
                          }
                        >
                          <span
                            role="cell"
                            className="table-cell opacity-40 italic font-extralight pl-4 py-2"
                          >
                            {i + 1}.{" "}
                          </span>
                          <span role="cell" className="table-cell">
                            {title}
                            {addition ? (
                              <span className="opacity-60 font-normal">
                                {" "}
                                {addition}
                              </span>
                            ) : null}
                          </span>
                          <span role="cell" className="table-cell">
                            <time
                              className="!mb-0 opacity-40 italic font-extralight"
                              dateTime={secondsToDuration(duration, "iso8601")}
                            >
                              {secondsToDuration(duration)}
                            </time>
                          </span>
                        </Comp>
                      );
                    })}
                  </div>
                </div>
              </>
            ) : null}
          </div>

          {preSaves.length && (preSavePreview || releaseDate > Date.now()) ? (
            <div>
              <div className={proseStyles}>
                <h3>Pre-Save on</h3>
              </div>
              <p className="flex flex-col gap-4 mt-4">
                {preSaves.map(({ service, ...save }) => {
                  const Comp = PreSaveButtons[service];

                  const returnUrl = new URL(getOrigin());
                  returnUrl.pathname = slug;
                  if (preSavePreview) {
                    returnUrl.searchParams.set("presave_preview", "1");
                  }

                  return (
                    <Comp
                      {...save}
                      key={service}
                      returnUrl={returnUrl.toString()}
                    />
                  );
                })}
              </p>
            </div>
          ) : null}
        </div>
      </div>

      {!preSavePreview && shops.length && releaseDate <= Date.now() ? (
        <div className="px-6 xl:px-0 mb-12">
          <div className={proseStyles}>
            <h3>Stream now on</h3>
          </div>
          <p className="grid gap-4 grid-cols-2 md:grid-cols-5 mt-4">
            {shops
              .sort(
                ({ type: a }, { type: b }) =>
                  shopOrder.indexOf(a) - shopOrder.indexOf(b)
              )
              .map(({ type, link }) => {
                const { Logo, name } = shopTypes[type];
                return (
                  <a
                    href={link}
                    key={type}
                    target="_blank"
                    rel="noopener"
                    className={buttonStyles}
                  >
                    <Logo
                      role="img"
                      className="h-screen max-h-9 xl:max-h-12"
                      aria-label={name}
                    />
                  </a>
                );
              })}
          </p>
        </div>
      ) : null}

      <div className={`px-6 ${proseStyles}`}>
        {Description ? <Description /> : null}

        <h3 className="!mt-24">Contributors</h3>
        <p>
          {contributors.map(({ name, link, roles, description }) => (
            <Fragment key={name}>
              <strong title={description}>
                {link ? (
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener"
                    className={clsx(focusStyles, "rounded-md")}
                  >
                    {myHumbleSelf(name)}
                  </a>
                ) : (
                  myHumbleSelf(name)
                )}
              </strong>
              : {roles.join(", ")}
              <br />
            </Fragment>
          ))}
        </p>
      </div>
    </div>
  );
}

function myHumbleSelf(name: string) {
  if (["Hannes Diem", "Hannes Diercks"].includes(name.trim())) {
    return "My humble self";
  }
  return name;
}
