import { NextResponse, type NextRequest } from "next/server";

const enableRewrites = true;
const ROOT_PATHS = [/^\/_next(\/|$)/];
const PAYLOAD_PATHS = [/^\/admin(\/|$)/, /^\/api(\/|$)/];
const urlMappings: Record<string, string> = {};
let payloadHost = "cms.xiphe.net";

if (process.env.NODE_ENV === "development") {
  payloadHost = "localhost:2999";
  urlMappings["localhost:3000"] = process.env.DEFAULT_TENANT || "hannesdiem.de";
}

export function middleware(req: NextRequest) {
  let host = req.headers.get("host");
  host = (host && urlMappings[host]) || host;

  const isPayloadReq = Boolean(
    PAYLOAD_PATHS.find((p) => p.test(req.nextUrl.pathname)),
  );
  const isRootRequest = Boolean(
    !isPayloadReq && ROOT_PATHS.find((p) => p.test(req.nextUrl.pathname)),
  );

  if (enableRewrites && isPayloadReq && host !== payloadHost) {
    req.nextUrl.host = payloadHost;
    return NextResponse.redirect(req.nextUrl, { status: 301 });
  }

  if (enableRewrites && !(isRootRequest || isPayloadReq)) {
    req.nextUrl.pathname = `/${host}${req.nextUrl.pathname}`;
    return NextResponse.rewrite(req.nextUrl);
  }

  return NextResponse.next();
}
