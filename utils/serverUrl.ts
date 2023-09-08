import { headers } from "next/headers";

export function getOrigin() {
  const headersList = headers();

  return `${
    headersList.get("x-forwarded-proto") || "https"
  }://${headersList.get("host")}`;
}

export function getServerUrl() {
  return `${getOrigin()}${headers().get("next-url") || ""}`;
}
