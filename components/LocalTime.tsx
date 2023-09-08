"use client";

import { useMounted } from "@/utils/useMounted";

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
}: LocalDateProps) {
  const date = new Date(timeStamp);
  const mounted = useMounted();

  return (
    <time dateTime={date.toISOString()}>
      {mounted ? date.toLocaleDateString(locales, format) : date.toUTCString()}
    </time>
  );
}
