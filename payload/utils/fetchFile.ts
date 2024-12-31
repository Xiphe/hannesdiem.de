import assert from "node:assert";

const INTERNAL_FILE_READ_KEY = process.env.INTERNAL_FILE_READ_KEY;
assert(INTERNAL_FILE_READ_KEY, "INTERNAL_FILE_READ env must be set");

export function fetchFile(url: string) {
  return fetch(
    process.env.NODE_ENV === "development"
      ? "http://localhost:2999" + url
      : url,
    {
      headers: {
        Authorization: `Bearer ${INTERNAL_FILE_READ_KEY}`,
      },
    },
  );
}
