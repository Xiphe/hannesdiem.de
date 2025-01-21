"use client";

import { PropsWithChildren, useState } from "react";
import { Paper } from "./Paper";
import { cx } from "@gf/cx";
import { focusLightStyles } from "@gf/styles/styles";
import { XMarkIcon } from "@heroicons/react/24/solid";

interface InfoPaperProps extends PropsWithChildren {
  className?: string;
}
export function InfoPaper({ children, className }: InfoPaperProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <Paper
      className={cx(
        "relative transition-all duration-300",
        "md:flex md:items-center md:justify-center px-8 py-6",
        className,
        !isExpanded
          ? "md:w-16 md:h-16 md:p-0 md:rounded-[2rem]"
          : "md:w-max lg:p-12 lg:py-10",
      )}
    >
      <button
        className={cx(
          "hidden md:block",
          "absolute rounded-full transition-all duration-300",
          focusLightStyles,
          isExpanded
            ? "top-3 right-3 w-6 h-6"
            : "top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 w-16 h-16",
        )}
        aria-label={isExpanded ? "Schließen" : "Mehr..."}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div
          aria-hidden
          className={cx(
            "absolute inset-0 flex items-center justify-center transition-opacity duration-300",
            isExpanded ? "opacity-100" : "opacity-0",
          )}
        >
          <XMarkIcon className="fill-paper-500 w-6 h-6" />
        </div>
        <div
          aria-hidden
          className={cx(
            "text-ink-950 absolute inset-0 flex items-center justify-center transition-opacity duration-300",
            isExpanded ? "opacity-0" : "opacity-100",
          )}
        >
          <span className="text-3xl">...</span>
        </div>
      </button>
      <div
        className={cx(
          "shrink-0 prose prose-licorice lg:prose-xl opacity-100 transition-all duration-300",
          !isExpanded && "md:scale-0  md:opacity-0",
        )}
      >
        {children}
      </div>
    </Paper>
  );
}
