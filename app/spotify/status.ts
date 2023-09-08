export enum SPOTIFY_STATUS {
  SUCCESS = "success",
  COOKIE_MISSING = "cookie_missing",
  ACCESS_DENIED = "access_denied",
  STATE_MISMATCH = "state_mismatch",
  CODE_MISSING = "code_missing",
  CODE_EXCHANGE_FAILED = "code_exchange_failed",
  CODE_EXCHANGE_INVALID = "code_exchange_invalid",
  TOKEN_REFRESH_FAILED = "token_refresh_failed",
  TOKEN_REFRESH_INVALID = "token_refresh_invalid",
}

export function isSpotifyStatus(status: unknown): status is SPOTIFY_STATUS {
  return (
    typeof status === "string" &&
    Object.values(SPOTIFY_STATUS).includes(status as SPOTIFY_STATUS)
  );
}
