import { createCacheEntry } from "@epic-web/cachified";
import { cached } from "@utils/cachedFn";
import { decrypt, encrypt } from "@utils/encrypt";
import { payloadCache } from "@utils/payloadCache";
import { DropboxResponse, type Dropbox, type DropboxAuth } from "dropbox";
import assert from "node:assert";

const DROPBOX_REFRESH_TOKEN = process.env.DROPBOX_REFRESH_TOKEN;
assert(DROPBOX_REFRESH_TOKEN, "DROPBOX_REFRESH_TOKEN environment must be set");
const DROPBOX_APP_CLIENT_ID = process.env.DROPBOX_APP_CLIENT_ID;
assert(DROPBOX_APP_CLIENT_ID, "DROPBOX_APP_CLIENT_ID environment must be set");
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;
assert(ENCRYPTION_KEY, "ENCRYPTION_KEY environment must be set");

interface CachedAccessToken {
  accessToken: string;
  accessTokenExpiresAt: number;
}

export const getDropbox = cached(async () => {
  const cached = await payloadCache.get("hdx-dropbox-access-token");
  const incoming =
    cached &&
    (JSON.parse(
      decrypt(cached.value, Buffer.from(ENCRYPTION_KEY, "hex")),
    ) as CachedAccessToken);
  const DBX = (await import("dropbox/es")).Dropbox;

  const dbx: Dropbox = new DBX({
    ...(incoming
      ? {
          accessToken: incoming.accessToken,
          accessTokenExpiresAt: new Date(incoming.accessTokenExpiresAt),
        }
      : {}),
    clientId: DROPBOX_APP_CLIENT_ID,
    refreshToken: DROPBOX_REFRESH_TOKEN,
    fetch,
  });

  const auth: DropboxAuth = (dbx as any).auth;
  eventuallyRefresh(auth, incoming).catch(console.error);

  // by default, the sdk will try to use `res.buffer` in prod. So we need to overwrite
  dbx.filesDownload = async function filesDownload({ path }) {
    const res = await fetch("https://content.dropboxapi.com/2/files/download", {
      method: "POST",
      headers: {
        "Dropbox-API-Arg": JSON.stringify({ path }),
        Authorization: `Bearer ${auth.getAccessToken()}`,
      },
    });

    const data = await res.blob();
    const result = {
      ...JSON.parse(res.headers.get("dropbox-api-result") || "{}"),
      fileBlob: data,
    };

    return new DropboxResponse(res.status, res.headers, result);
  };

  return dbx;
});

async function eventuallyRefresh(
  auth: DropboxAuth,
  incoming?: CachedAccessToken | null,
) {
  await auth.checkAndRefreshAccessToken();

  const accessToken = auth.getAccessToken();
  const expires = auth.getAccessTokenExpiresAt();

  if (incoming && incoming.accessToken === accessToken) {
    return;
  }

  const encrypted = encrypt(
    JSON.stringify({
      accessToken,
      accessTokenExpiresAt: expires.getTime(),
    } satisfies CachedAccessToken),
    Buffer.from(ENCRYPTION_KEY!, "hex"),
  );

  return payloadCache.set(
    "hdx-dropbox-access-token",
    createCacheEntry(encrypted, { ttl: expires.getTime() - Date.now() }),
  );
}
