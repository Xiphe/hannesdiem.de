import { createVerify } from "node:crypto";

/**
 * Verifies a signature using an RSA public key (PEM format).
 * @param publicKeyPem The public key in PEM format.
 * @param message The original message.
 * @param signature The signature in hex format.
 * @returns True if the signature is valid, otherwise false.
 */
export function verifySignature(
  publicKeyPem: string,
  message: string,
  signature: string,
): boolean {
  const verifier = createVerify("sha256");
  verifier.update(message);
  verifier.end();

  return verifier.verify(publicKeyPem, signature, "hex");
}
