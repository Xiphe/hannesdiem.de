import clsx from "clsx";
import { ComponentPropsWithoutRef } from "react";

interface TextBlockProps extends ComponentPropsWithoutRef<"div"> {
  bigOnLg?: false;
  as?: "section" | "div";
}

export function TextBlock({
  children,
  className,
  bigOnLg,
  as: Comp = "section",
  ...props
}: TextBlockProps) {
  return (
    <Comp
      className={clsx(
        "text-box-block sm:mb-8 prose dark:prose-invert  p-8 mx-auto shadow-sm",
        bigOnLg !== false && "lg:prose-xl",
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}
