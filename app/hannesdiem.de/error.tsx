"use client";

import { focusStyles } from "@hd/utils/styles";
import clsx from "clsx";

interface GlobalErrorProps {
  error: Error;
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  return (
    <>
      <div className="flex-grow max-w-7xl mx-auto p-6 lg:px-8 flex flex-col justify-center">
        <h1 className="text-4xl font-serif mb-6">Something went wrong!</h1>
        {error ? (
          <code className="font-mono bg-black text-green-500 p-4 mb-4">
            <pre>{error?.message || "An unexpected error occurred."}</pre>
          </code>
        ) : null}
        <p className="text-center">
          <a
            className={clsx(focusStyles, "rounded-sm")}
            href="#"
            onClick={(ev) => {
              ev.preventDefault();
              reset();
            }}
          >
            Try Again
          </a>{" "}
          &bull;{" "}
          <a className={clsx(focusStyles, "rounded-sm")} href="/">
            Go back to the homepage
          </a>
        </p>
      </div>
    </>
  );
}
