import { ComponentType, Fragment } from "react";
import Image from "next/image";
import clsx from "clsx";
import {
  PreSaveProps,
  PreSaveService,
  Release,
  shops as shopTypes,
} from "@/content";
import { buttonStyles, focusStyles, getOrigin, proseStyles } from "@/utils";
import SpotifyPreSaveButton from "@/app/spotify/PreSaveButton";
import DeezerPreSaveButton from "@/app/deezer/PreSaveButton";
import { LocalTime } from "../LocalTime";

const PreSaveButtons: Record<PreSaveService, ComponentType<PreSaveProps>> = {
  spotify: SpotifyPreSaveButton,
  deezer: DeezerPreSaveButton,
};
const shopOrder = Object.keys(shopTypes);

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
            <h1>
              {artist ? <>{artist} - </> : null}
              {title}
            </h1>
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
          </div>

          {preSaves.length && (preSavePreview || releaseDate > Date.now()) ? (
            <div>
              <div className={proseStyles}>
                <h3>Pre-Save on</h3>
              </div>
              <p className="flex flex-col gap-4 mt-4">
                {preSaves.map(({ service, ...save }) => {
                  const Comp = PreSaveButtons[service];

                  if (
                    (!preSavePreview && save.type === "internal") ||
                    (preSavePreview && save.type === "external")
                  ) {
                    return null;
                  }

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
