import { createCacheEntry } from "@epic-web/cachified";
import { cached } from "@utils/cachedFn";
import { decrypt, encrypt } from "@utils/encrypt";
import { payloadCache } from "@utils/payloadCache";
import { type Dropbox, type DropboxAuth } from "dropbox";
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

  eventuallyRefresh((dbx as any).auth, incoming).catch(console.error);

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
