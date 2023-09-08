"use client";

import { ComponentPropsWithoutRef } from "react";

export default function NewWindowLink(props: ComponentPropsWithoutRef<"a">) {
  return (
    <a
      {...props}
      onClick={(ev) => {
        props.onClick?.(ev);
        if (!ev.defaultPrevented) {
          ev.preventDefault();
          window.open(props.href, "PreSave", "width=500,height=700");
        }
      }}
    />
  );
}
