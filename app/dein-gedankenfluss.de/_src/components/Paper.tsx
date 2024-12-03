import { useRelativeLightDirection } from "@utils/light-tailwind-plugin/ElementDirection";
import { cx } from "@utils/cx";
import { ComponentPropsWithoutRef } from "react";

export interface PaperProps extends ComponentPropsWithoutRef<"div"> {}

export function Paper({ className, ...props }: PaperProps) {
  return (
    <div
      className={cx("bg-paper text-black light shadow rounded-xs ", className)}
      {...useRelativeLightDirection<HTMLDivElement>()}
      {...props}
    />
  );
}
