import { generateKeyPairSync } from "node:crypto";

/**
 * Generates an RSA key pair and returns them in PEM format.
 * @returns An object with publicKey and privateKey.
 */
export function generateKeys(): { publicKey: string; privateKey: string } {
  const { publicKey, privateKey } = generateKeyPairSync("rsa", {
    modulusLength: 4096, // Key size in bits
    publicKeyEncoding: {
      type: "pkcs1",
      format: "pem",
    },
    privateKeyEncoding: {
      type: "pkcs1",
      format: "pem",
    },
  });

  return { publicKey, privateKey };
}

const { publicKey, privateKey } = generateKeys();
console.log("Public Key PEM:");
console.log(Buffer.from(publicKey, "utf8").toString("base64url"));
console.log("Private Key PEM:");
console.log(Buffer.from(privateKey, "utf8").toString("base64url"));
