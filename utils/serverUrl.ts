import { headers } from "next/headers";

export function getOrigin() {
  const headersList = headers();
  const proto = (headersList.get("x-forwarded-proto") || "https").split(",")[0];

  return `${proto}://${headersList.get("host")}`;
}

export function getServerUrl() {
  return `${getOrigin()}${headers().get("next-url") || ""}`;
}
