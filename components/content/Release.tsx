import { Contributor, Release, shops as shopTypes } from "@/content";
import { focusStyles } from "@/utils";
import Image from "next/image";
import { Fragment } from "react";
import clsx from "clsx";

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
}: Release) {
  return (
    <div className="container max-w-screen-xl mx-auto text-black dark:text-white pb-8">
      <div className="gap-6 sm:p-6 md:flex mb-4">
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
            <span className="opacity-60">Released: </span>
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
                  className={clsx(
                    focusStyles,
                    "flex justify-center bg-pink-100 dark:bg-blue-700 p-6 rounded-lg hover:bg-pink-200 dark:hover:bg-blue-800"
                  )}
                >
                  <Logo role="img" aria-label={name} />
                </a>
              );
            })}
        </p>
      </div>
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
                    {name}
                  </a>
                ) : (
                  name
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
