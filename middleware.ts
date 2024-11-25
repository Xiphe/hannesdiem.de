import { NextResponse, type NextRequest } from "next/server";

const ROOT_PATHS = [/^\/_next(\/|$)/];
const PAYLOAD_PATHS = [/^\/admin(\/|$)/, /^\/api(\/|$)/];
const PAYLOAD_DOMAIN = "cms.xiphe.net";
const enableRewrites = process.env.NODE_ENV === "production";

export function middleware(req: NextRequest) {
  let host = req.headers.get("host");
  const isPayloadReq = Boolean(
    PAYLOAD_PATHS.find((p) => p.test(req.nextUrl.pathname)),
  );
  const isRootRequest = Boolean(
    !isPayloadReq && ROOT_PATHS.find((p) => p.test(req.nextUrl.pathname)),
  );

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
