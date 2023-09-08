import { ComponentType, Fragment } from "react";
import Image from "next/image";
import clsx from "clsx";
import {
  PreSaveProps,
  PreSaveService,
  Release,
  shops as shopTypes,
} from "@/content";
import { buttonStyles, focusStyles, getOrigin } from "@/utils";
import SpotifyPreSaveButton from "@/app/spotify/PreSaveButton";
import DeezerPreSaveButton from "@/app/deezer/PreSaveButton";

const PreSaveButtons: Record<PreSaveService, ComponentType<PreSaveProps>> = {
  spotify: SpotifyPreSaveButton,
  deezer: DeezerPreSaveButton,
};
const shopOrder = Object.keys(shopTypes);
const proseStyles = "prose prose-zinc dark:prose-invert lg:prose-xl";

export default function ReleaseRenderer({
  cover,
  title,
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
  searchParams,
}: Release & {
  slug: string;
  searchParams: Record<string, string | string[]>;
}) {
  const preSavePreview = Boolean(searchParams.presave_preview);

  return (
    <div className="container max-w-screen-xl mx-auto text-black dark:text-white pb-8">
      <div className="gap-6 lg:gap-16 sm:p-6 md:flex mb-4">
        <div className="w-full md:w-1/2">
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
        <div className={`p-6 sm:px-0 md:pt-0 ${proseStyles}`}>
          <h1>
            {artist ? <>{artist} - </> : null}
            {title}
          </h1>
          <p>
            <span className="opacity-60">
              {releaseDate > Date.now() ? "Release" : "Released"}:{" "}
            </span>
            {new Date(releaseDate).toLocaleDateString(
              undefined,
              releaseDateFormat || {
                year: "numeric",
                month: "long",
                day: "numeric",
              }
            )}
            <br />
            <span className="opacity-60">Genre: </span>
            {genres.join(", ")}
            <br />
            <span className="opacity-60">Language: </span>
            {languages.join(", ")}
          </p>
        </div>
      </div>

      {preSaves.length && (preSavePreview || releaseDate > Date.now()) ? (
        <div className="px-6 xl:px-0 mb-12">
          <div className={proseStyles}>
            <h3>Pre-Save on</h3>
          </div>
          <p className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4">
            {preSaves.map(({ service, ...save }) => {
              const Comp = PreSaveButtons[service];

              if (
                (!preSavePreview && save.type === "internal") ||
                (preSavePreview && save.type === "external")
              ) {
                return null;
              }

              return (
                <Comp
                  {...save}
                  key={service}
                  returnUrl={`${getOrigin()}/${slug}`}
                />
              );
            })}
          </p>
        </div>
      ) : null}

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
                    <Logo role="img" aria-label={name} />
                  </a>
                );
              })}
          </p>
        </div>
      ) : null}

      <div className={`px-6 ${proseStyles}`}>
        {Description ? <Description /> : null}

        <h3>Contributors</h3>
        <p>
          {contributors.map(({ name, link, roles, description }) => (
            <Fragment key={name}>
              <strong>
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
