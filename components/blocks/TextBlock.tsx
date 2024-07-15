import clsx from "clsx";
import { ComponentPropsWithoutRef } from "react";

interface TextBlockProps extends ComponentPropsWithoutRef<"div"> {
  bigOnLg?: false;
}

export function TextBlock({
  children,
  className,
  bigOnLg,
  ...props
}: TextBlockProps) {
  return (
    <div
      className={clsx(
        "text-box-block sm:mb-8 prose dark:prose-invert  p-8 mx-auto shadow-sm",
        bigOnLg !== false && "lg:prose-xl",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
