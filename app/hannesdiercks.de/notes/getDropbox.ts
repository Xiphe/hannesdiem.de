import { cached } from "@utils/cachedFn";
import { Dropbox } from "dropbox";
import assert from "node:assert";

const DROPBOX_REFRESH_TOKEN = process.env.DROPBOX_REFRESH_TOKEN;
assert(DROPBOX_REFRESH_TOKEN, "DROPBOX_REFRESH_TOKEN environment must be set");
const DROPBOX_APP_CLIENT_ID = process.env.DROPBOX_APP_CLIENT_ID;
assert(DROPBOX_APP_CLIENT_ID, "DROPBOX_APP_CLIENT_ID environment must be set");
const DROPBOX_APP_CLIENT_SECRET = process.env.DROPBOX_APP_CLIENT_SECRET;
assert(
  DROPBOX_APP_CLIENT_SECRET,
  "DROPBOX_APP_CLIENT_SECRET environment must be set",
);

export const getDropbox = cached(() => {
  return new Dropbox({
    clientId: DROPBOX_APP_CLIENT_ID,
    clientSecret: DROPBOX_APP_CLIENT_SECRET,
    refreshToken: DROPBOX_REFRESH_TOKEN,
    fetch,
  });
});
