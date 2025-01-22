import { cx } from "@gf/cx";
import { ComponentPropsWithRef } from "react";

export interface ServerPaperProps extends ComponentPropsWithRef<"div"> {
  as?: React.ElementType;
  sheet?: boolean | "xl";
}

export const sheetStyles =
  "mx-auto px-4 sm:px-12 pt-12 pb-8 md:pt-16 md:pb-12 mb-8";

export function ServerPaper({
  className,
  as: Comp = "div",
  sheet,
  ...props
}: ServerPaperProps) {
  return (
    <Comp
      className={cx(
        "bg-paper light shadow rounded-xs ",
        sheet && sheetStyles,
        sheet === "xl" && "max-w-screen-lg",
        sheet === true && "max-w-screen-md",
        className,
      )}
      {...props}
    />
  );
}
