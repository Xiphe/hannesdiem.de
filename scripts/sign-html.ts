import { createSign } from "node:crypto";
import assert from "node:assert";

const MESSAGE = `
<h1>Sign me!</h1>
`.trim();

const HTML_SIGNATURE_PRIVATE_KEY = process.env.HTML_SIGNATURE_PRIVATE_KEY;
assert(
  HTML_SIGNATURE_PRIVATE_KEY,
  "HTML_SIGNATURE_PRIVATE_KEY env must be set",
);

/**
 * Signs a message using an RSA private key (PEM format).
 * @param privateKeyPem The private key in PEM format.
 * @param message The message (string) to sign.
 * @returns The signature in hex format.
 */
export function signMessage(privateKeyPem: string, message: string): string {
  const signer = createSign("sha256");
  signer.update(message);
  // finalize input
  signer.end();

  // return signature in hex format
  return signer.sign(privateKeyPem, "hex");
}

const privateKey = Buffer.from(
  HTML_SIGNATURE_PRIVATE_KEY!,
  "base64url",
).toString("utf8");

const signature = signMessage(privateKey, MESSAGE);

console.log(`<div data-signature="${signature}">${MESSAGE}</div>`);
