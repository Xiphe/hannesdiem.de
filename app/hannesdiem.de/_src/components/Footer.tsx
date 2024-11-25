import { focusStyles } from "@hd/utils/styles";
import { getOrigin } from "@utils/origin";
import clsx from "clsx";
import Link from "next/link";

export default async function Footer() {
  return (
    <footer className="container max-w-screen-xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 py-20">
      <div />
      <Link
        href={await getOrigin()}
        className={clsx(
          focusStyles,
          "rounded flex justify-center items-center",
        )}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo.svg"
          alt=""
          className="h-20 z-10 relative mr-2"
          aria-hidden
        />
        <span className="flex flex-col items-center">
          <span className="text-3xl font-extralight text-black dark:text-white">
            Hannes Diem
          </span>
        </span>
      </Link>
      <div className="flex justify-end items-end mt-20 md:mt-0">
        <div className="opacity-50">
          <Link
            href="/imprint"
            className={clsx(focusStyles, "underline rounded")}
          >
            imprint
          </Link>{" "}
          &bull;{" "}
          <Link
            href="/privacy"
            className={clsx(focusStyles, "underline rounded")}
          >
            privacy
          </Link>
        </div>
      </div>
    </footer>
  );
}
