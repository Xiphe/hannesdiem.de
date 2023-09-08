import { releases } from "@/content/releases";
import { LocalTime } from "../LocalTime";
import { Release } from "@/content";
import Link from "next/link";
import clsx from "clsx";
import Image from "next/image";
import { buttonStyles, focusStyles } from "@/utils";

export default function FreshRelease() {
  const now = Date.now();
  const fresh: [string, Release] | undefined = Object.entries(releases)
    .sort(([_, a], [__, b]) => b.releaseDate - a.releaseDate)
    .find(([_, release]) => {
      const fourWeeksAgo = now - 1000 * 60 * 60 * 24 * 7 * 4;
      const threeWeeksAhead = now + 1000 * 60 * 60 * 24 * 7 * 3;
      return (
        release.releaseDate > fourWeeksAgo &&
        release.releaseDate < threeWeeksAhead
      );
    });

  if (!fresh) {
    return null;
  }

  const [slug, { cover, releaseDate, title, releaseDateFormat }] = fresh;
  const isFutureRelease = releaseDate > now;

  return (
    <Link
      href={`/${slug}`}
      className={clsx(
        focusStyles,
        "px-6 mb-8 pb-4 md:pb-0 text-center md:text-left",
        "gap-4 md:gap-6 flex flex-col items-center justify-center md:flex-row ",
        "bg-gradient-to-b from-purple-700 to-purple-600 text-white"
      )}
    >
      <span
        className={clsx(
          "block overflow-hidden relative w-40 shrink-0 mt-2 md:mt-0 rounded-sm md:rounded-none",
          "md:scale-110 md:translate-y-2",
          "md:border-b-4 border-purple-700"
        )}
        style={{ aspectRatio: `${cover.width} / ${cover.height}` }}
      >
        <Image
          priority
          src={cover.src}
          alt={cover.alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </span>
      <span>
        <span className="block text-2xl">
          <span className="font-black">{title}</span>
          {isFutureRelease ? (
            <>
              {" "}
              will be released{" "}
              <LocalTime timeStamp={releaseDate} format={releaseDateFormat} />
            </>
          ) : (
            "has just been released"
          )}
          !
        </span>
        <span className="opacity-50">
          I got everything: {isFutureRelease ? "pre-save" : "streaming"} links,
          background information, lyrics, and more!
        </span>
      </span>
      <span className="flex items-center justify-center">
        <span className={clsx(buttonStyles, "whitespace-nowrap text-blue-900")}>
          Check it out!
        </span>
      </span>
    </Link>
  );
}
