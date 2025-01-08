import { Footer } from "@hd/components";
import { LocalTime } from "@/app/(common)/components/LocalTime";
import { Release } from "@hd/content";
import { releases } from "@hd/content/releases";
import { focusStyles } from "@hd/utils/styles";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

export default function ReleasesPage() {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div className="mx-auto px-6 mt-12 container max-w-screen-xl pb-8">
        <h1 className="text-5xl lg:text-7xl font-thin text-center ">work</h1>
        <p className="opacity-75 my-4 max-w-lg mx-auto">
          This is my art.
          <br />
          An essence that I have densified further and further through time and
          force until I barely was able to hold it.
          <br />
          It burned me, it has cut me, it made me cry and smile and jump and
          dance... and in that helped me to let go of frequencies that would
          otherwise eat me from the inside.
        </p>
        <hr className="my-4 lg:my-8 border-blue-500" />

        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...releases]
            .sort(({ releaseDate: a }, { releaseDate: b }) => b - a)
            .map((release: Release) => (
              <li key={release.slug}>
                <Link
                  href={`/${release.slug}`}
                  className={clsx(
                    focusStyles,
                    "block rounded-sm hover:bg-blue-700 hover:ring-8 hover:ring-blue-700",
                  )}
                >
                  <div
                    className="rounded overflow-hidden relative sm:shadow-md shadow-black"
                    style={{
                      aspectRatio: `${release.cover.width} / ${release.cover.height}`,
                    }}
                  >
                    <Image
                      priority
                      src={release.cover.src}
                      alt={release.cover.alt}
                      fill
                      sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                    />
                  </div>
                  <h3 className="text-xl font-bold mt-4">
                    {release.artist ? <>{release.artist} - </> : null}
                    {release.title}
                  </h3>
                  {release.subtitle ? (
                    <h4 className="text-lg">{release.subtitle}</h4>
                  ) : null}

                  <LocalTime
                    className="opacity-50"
                    timeStamp={release.releaseDate}
                    format={release.releaseDateFormat}
                  />

                  <p className="opacity-75 mt-4">{release.summary}</p>
                </Link>
              </li>
            ))}
        </ul>
      </div>
      <Footer />
    </div>
  );
}
