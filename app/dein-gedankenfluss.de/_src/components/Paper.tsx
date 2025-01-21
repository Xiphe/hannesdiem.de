"use client";

import {
  Strength,
  useRelativeLightDirection,
} from "@utils/light-tailwind-plugin/ElementDirection";
import { cx } from "@gf/cx";
import { ComponentPropsWithoutRef, ComponentPropsWithRef } from "react";

export interface PaperProps extends ComponentPropsWithRef<"div"> {
  as?: React.ElementType;
  sheet?: boolean | "xl";
  lightStrength?: Strength | number;
}

const sheetStyles =
  "mx-auto px-4 sm:px-8 md:px-12 pt-12 pb-8 md:pt-16 md:pb-12 mb-8";

export function Paper({
  className,
  lightStrength,
  as: Component = "div",
  sheet,
  ...props
}: PaperProps) {
  return (
    <Component
      className={cx(
        "bg-paper light shadow rounded-xs ",
        sheet && sheetStyles,
        sheet === "xl" && "max-w-screen-lg",
        sheet === true && "max-w-screen-md",
        className,
      )}
      {...useRelativeLightDirection<HTMLDivElement>(lightStrength)}
      {...props}
    />
  );
}
