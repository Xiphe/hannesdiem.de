"use client";

import { useMounted } from "@/utils/useMounted";
import { ComponentPropsWithoutRef } from "react";

export interface LocalDateProps {
  timeStamp: number;
  locales?: Intl.LocalesArgument;
  format?: Intl.DateTimeFormatOptions;
}
export function LocalTime({
  timeStamp,
  locales,
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
    <time dateTime={date.toISOString()} {...rest}>
      {mounted ? date.toLocaleDateString(locales, format) : date.toUTCString()}
    </time>
  );
}
