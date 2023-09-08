import { headers } from "next/headers";

export function getOrigin() {
  const headersList = headers();
  const proto = (headersList.get("x-forwarded-proto") || "https").split(",")[0];

  return `${proto}://${headersList.get("host")}`;
}
