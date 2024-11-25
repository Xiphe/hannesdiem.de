import { NextResponse, type NextRequest } from "next/server";
import { isMatch } from "micromatch";

const ROOT_PATHS = ["_next", "/_next/*"];
const PAYLOAD_PATHS = ["/admin", "/admin/*", "/api", "/api/*"];
const PAYLOAD_DOMAIN = "cms.xiphe.net";
const enableRewrites = process.env.NODE_ENV === "production";

export function middleware(req: NextRequest) {
  let host = req.headers.get("host");
  const isPayloadReq = isMatch(req.nextUrl.pathname, PAYLOAD_PATHS);
  const isRootRequest = isMatch(req.nextUrl.pathname, ROOT_PATHS);

  if (enableRewrites && isPayloadReq && host !== PAYLOAD_DOMAIN) {
    req.nextUrl.host = PAYLOAD_DOMAIN;
    return NextResponse.redirect(req.nextUrl, { status: 301 });
  }

  if (enableRewrites && !(isRootRequest || isPayloadReq)) {
    req.nextUrl.pathname = `/${host}${req.nextUrl.pathname}`;
    return NextResponse.rewrite(req.nextUrl);
  }

  return NextResponse.next();
}
