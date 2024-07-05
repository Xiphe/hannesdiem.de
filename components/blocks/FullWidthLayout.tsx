import clsx from "clsx";
import { PropsWithChildren } from "react";

export function FullWidthLayout({
  children,
  className,
}: PropsWithChildren<{ className: string }>) {
  return <div className={clsx("pb-24", className)}>{children}</div>;
}
