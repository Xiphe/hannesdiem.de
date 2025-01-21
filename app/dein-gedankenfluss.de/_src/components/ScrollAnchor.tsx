"use client";

import Link from "next/link";
import { ComponentPropsWithoutRef } from "react";

export function ScrollAnchor({
  href,
  ...props
}: ComponentPropsWithoutRef<"a">) {
  if (!href) {
    return <a {...props} />;
  }

  return (
    <Link
      href={href}
      {...props}
      onClick={(ev) => {
        if (!href.match(/#/)) {
          return;
        }

        if (href.startsWith("/")) {
          const path = href.split(/#|\?/)[0];
          if (location.pathname !== path) {
            return;
          }
        }

        const targetId = href.split("#").pop();
        const targetElement = targetId
          ? document.getElementById(targetId)
          : null;

        if (targetElement) {
          ev.preventDefault();
          targetElement.scrollIntoView({ behavior: "smooth" });
        }
      }}
    />
  );
}
