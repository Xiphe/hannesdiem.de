"use client";

import { useMounted } from "@utils/useMounted";
import clsx from "clsx";
import { ComponentPropsWithoutRef, useEffect, useState } from "react";

export interface LocalDateProps {
  timeStamp: number;
  locales?: Intl.LocalesArgument;
  format?: Intl.DateTimeFormatOptions;
}
export function LocalTime({
  timeStamp,
  locales,
  className,
  format = {
    year: "numeric",
    month: "long",
    day: "numeric",
  },
  ...rest
}: LocalDateProps & ComponentPropsWithoutRef<"time">) {
  const date = new Date(timeStamp);
  const mounted = useMounted();

  return (
    <time
      dateTime={date.toISOString()}
      {...rest}
      className={clsx(
        className,
        !mounted && "!opacity-0",
        "transition-opacity duration-500",
      )}
    >
      {mounted ? date.toLocaleDateString(locales, format) : date.toUTCString()}
    </time>
  );
}
