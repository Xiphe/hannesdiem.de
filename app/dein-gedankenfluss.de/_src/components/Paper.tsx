"use client";

import {
  Strength,
  useRelativeLightDirection,
} from "@utils/light-tailwind-plugin/ElementDirection";
import { cx } from "@gf/cx";
import { ComponentPropsWithoutRef } from "react";

export interface PaperProps extends ComponentPropsWithoutRef<"div"> {
  as?: React.ElementType;
  lightStrength?: Strength | number;
}

export function Paper({
  className,
  lightStrength,
  as: Component = "div",
  ...props
}: PaperProps) {
  return (
    <Component
      className={cx("bg-paper text-black light shadow rounded-xs ", className)}
      {...useRelativeLightDirection<HTMLDivElement>(lightStrength)}
      {...props}
    />
  );
}
