import { proseStyles } from "@/utils/styles";
import clsx from "clsx";
import { ComponentPropsWithoutRef } from "react";

export function TextBlock({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={clsx(proseStyles, "px-2 md:px-0 mx-auto", className)}
      {...props}
    >
      {children}
    </div>
  );
}
