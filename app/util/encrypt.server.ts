import {
  randomBytes,
  createCipheriv,
  createDecipheriv,
  createHash,
  BinaryToTextEncoding,
} from 'crypto';
import assert from 'assert';

assert(process.env.ENCRYPTION_KEY, 'ENCRYPTION_KEY env variable missing');

const algorithm = 'aes-256-cbc';
const default_key = Buffer.from(process.env.ENCRYPTION_KEY, 'hex');

export interface EncryptOptions {
  iv?: Buffer;
  key?: Buffer;
  encoding?: 'base64url' | 'hex';
}

export function encrypt(
  text: string,
  { iv: externalIv, encoding = 'hex', key = default_key }: EncryptOptions,
) {
  const iv = externalIv || randomBytes(16);
  const cipher = createCipheriv(algorithm, key, iv);
  const encrypted = cipher.update(text);
  const checksum = createHash('sha256', key).update(text).digest(encoding);
  return `${checksum.substring(0, 4)}${
    externalIv ? '' : iv.toString(encoding)
  }${Buffer.concat([encrypted, cipher.final()]).toString(encoding)}`;
}

export function decrypt(
  text: string,
  { iv: externalIv, encoding = 'hex', key = default_key }: EncryptOptions,
) {
  const check = text.substring(0, 4);
  const ivHex = externalIv
    ? null
    : text.substring(4, encoding === 'hex' ? 32 : 22);
  const encryptedData = text.substring(
    externalIv ? 4 : encoding === 'hex' ? 36 : 24,
  );
  const iv = !externalIv ? Buffer.from(ivHex!, encoding) : externalIv;
  const encryptedText = Buffer.from(encryptedData, encoding);
  const decipher = createDecipheriv(algorithm, key, iv);
  const decrypted = decipher.update(encryptedText);
  const final = Buffer.concat([decrypted, decipher.final()]).toString();
  const checksum = createHash('sha256', key).update(final).digest(encoding);
  if (check !== checksum.substring(0, 4)) {
    throw new Error('Encryption checksum failed');
  }
  return final;
}
