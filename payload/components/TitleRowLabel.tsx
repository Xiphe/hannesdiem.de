"use client";

import { useRowLabel } from "@payloadcms/ui";
import { ArrayField } from "payload";

export default function TitleRowLabel({
  field,
}: {
  field: Pick<ArrayField, "label" | "labels">;
}) {
  const { data, rowNumber } = useRowLabel<{ title?: string }>();

  return (
    <div>
      {data.title ||
        `${field.labels?.singular || field.label || "Unknown"} ${String(rowNumber).padStart(2, "0")}`}
    </div>
  );
}
