import {
  randomBytes,
  createCipheriv,
  createDecipheriv,
  createHash,
} from "crypto";

const algorithm = "aes-256-cbc";

export interface EncryptOptions {
  iv?: Buffer;
  key?: Buffer;
}
export interface DecryptOptions {
  iv?: Buffer;
  key?: Buffer;
  gen?: Buffer;
  revokedIds?: Buffer[];
}

export interface DerivedKey {
  key: Buffer;
  id: Buffer;
  gen: Buffer;
}
export interface DeriveKeyOptions {
  from?: Buffer | DerivedKey;
  id?: Buffer;
}

export function encrypt(text: string, key: Buffer) {
  const iv = randomBytes(16);
  const cipher = createCipheriv(algorithm, key, iv);
  const encrypted = cipher.update(text);
  const checksum = createHash("sha256", key).update(text).digest("base64url");
  return [
    checksum.substring(0, 8),
    iv.toString("base64url"),
    Buffer.concat([encrypted, cipher.final()]).toString("base64url"),
  ].join("");
}

export function decrypt(cipher: string, key: Buffer) {
  try {
    const check = cipher.substring(0, 8);
    const ivEncoded = cipher.substring(8, 30);
    const encryptedData = cipher.substring(30);
    const iv = Buffer.from(ivEncoded, "base64url");
    const encryptedText = Buffer.from(encryptedData, "base64url");
    const decipher = createDecipheriv(algorithm, key, iv);
    const decrypted = decipher.update(encryptedText);
    const final = Buffer.concat([decrypted, decipher.final()]).toString();
    const checksum = createHash("sha256", key)
      .update(final)
      .digest("base64url");
    if (check !== checksum.substring(0, 8)) {
      throw new Error("Encryption checksum failed");
    }
    return final;
  } catch {
    throw new Error("Failed to decrypt message");
  }
}
