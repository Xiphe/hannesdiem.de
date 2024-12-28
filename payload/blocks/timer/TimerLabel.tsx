"use client";

import { toToReadableTime } from "@payload/utils/toReadableTime";
import { useFormFields } from "@payloadcms/ui";

export default function TimerLabel() {
  const t = useFormFields(([fields]) => fields.time?.value);
  return <>{toToReadableTime(typeof t === "number" ? t : 0)}</>;
}
