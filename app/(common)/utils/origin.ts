import { headers } from "next/headers";

export async function getOrigin() {
  const headersList = await headers();
  const host = headersList.get("host");
  const proto = (
    headersList.get("x-forwarded-proto") ||
    (host?.startsWith("localhost:") ? "http" : "https")
  ).split(",")[0];

  return `${proto}://${host}`;
}
