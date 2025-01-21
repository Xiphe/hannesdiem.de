"use client";

import Link from "next/link";
import { ComponentPropsWithoutRef, MouseEvent } from "react";

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

        scrollTo(href.split("#").pop(), ev);
      }}
    />
  );
}

export function scrollTo(target?: string | HTMLElement, ev?: MouseEvent) {
  if (!target) {
    return;
  }

  const targetElement =
    typeof target === "string" ? document.getElementById(target) : target;

  if (targetElement) {
    if (ev) {
      ev.preventDefault();
    }
    targetElement.scrollIntoView({ behavior: "smooth" });
  }
}
