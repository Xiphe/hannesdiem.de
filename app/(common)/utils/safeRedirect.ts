import { getOrigin } from "./origin";

const DEFAULT_REDIRECT = "/";

/**
 * This should be used any time the redirect path is user-provided
 * (Like the query string on our login/signup pages). This avoids
 * open-redirect vulnerabilities.
 * @param {string} to The redirect destination
 * @param {string} defaultRedirect The redirect to use if the to is unsafe.
 */
export async function safeRedirect(
  to: FormDataEntryValue | string | null | undefined,
  defaultRedirect: string = DEFAULT_REDIRECT,
) {
  if (
    typeof to === "string" &&
    (to.startsWith("/") ||
      to.startsWith("//") ||
      to.startsWith(await getOrigin()))
  ) {
    return to;
  }

  return defaultRedirect;
}
