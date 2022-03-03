import sharp, { ResizeOptions } from 'sharp';
import type { OptimizedImageProps } from '~/components/OptimizedImage';
import { cachified } from './cache.server';
import { createHash } from 'crypto';
import path from 'path';
import { readFile } from 'fs/promises';
import { decrypt, encrypt } from './encrypt.server';
import { redisCache } from './redis.server';
import assert from 'assert';
import rgbToHex, { RGBColor } from './rgbToHex';

assert(
  process.env.IMAGE_TOKEN_IV,
  'expect IMAGE_TOKEN_IV environment variable to be set',
);

const imgIv = Buffer.from(process.env.IMAGE_TOKEN_IV);

export interface Size {
  width: number;
  height: number;
  url: string;
}

type ResizeImageOpts = Omit<ResizeOptions, 'width' | 'height'> & {
  ratio: number;
};
export type OptimizeImageOptions = {
  resize?: ResizeImageOpts;
  blur?: number | boolean;
};

export async function optimizedImage(
  src: string,
  options?: OptimizeImageOptions,
): Promise<OptimizedImageProps> {
  const {
    width: maxWidth,
    ratio: originalRatio,
    colors,
    name,
  } = await getImageMeta(src);
  const ratio = options?.resize?.ratio || originalRatio;

  const sizes: Size[] = [
    size(
      Math.min(maxWidth, 250),
      Math.round(Math.min(maxWidth, 250) / ratio),
      src,
      options,
      name,
    ),
  ];

  let i = 250;
  while (i + 200 < maxWidth) {
    i += i === 250 ? 250 : i === 500 ? 500 : 1000;
    sizes.push(
      size(
        Math.min(maxWidth, i),
        Math.round(Math.min(maxWidth, i) / ratio),
        src,
        options,
        name,
      ),
    );
  }

  return { sizes, maxWidth, ratio, colors };
}

async function getImageMeta(src: string) {
  const isLocal = src.startsWith('/build/');
  const name = src.split('/').pop()!.split('?')[0].replace(/\..+$/, '');
  const res = isLocal ? false : await fetch(src);
  const etag = res ? res.headers.get('etag') : false;

  return cachified({
    cache: redisCache,
    key: `image-dimensions-${etag || src}`,
    maxAge: etag || !res ? undefined : 1000 * 60 * 60 * 24,
    // forceFresh: true,
    async getFreshValue() {
      const imgBuf = res
        ? Buffer.from(await res.arrayBuffer())
        : await readFile(
            path.join(__dirname, '../..', 'public', src.replace(/^\//, '')),
          );
      const image = sharp(imgBuf);
      const { width = 0, height = 0 } = await image.metadata();
      const { dominant, channels } = await image.stats();

      return {
        name: `${name}${
          isLocal
            ? ''
            : createHash('sha256')
                .update(etag || imgBuf.toString('base64'))
                .digest('hex')
                .substring(0, 8)
        }`,
        colors: {
          average: rgbToHex(...(channels.map(({ mean }) => mean) as RGBColor)),
          min: rgbToHex(...(channels.map(({ min }) => min) as RGBColor)),
          max: rgbToHex(...(channels.map(({ max }) => max) as RGBColor)),
          dominant: rgbToHex(...(Object.values(dominant) as RGBColor)),
        },
        width,
        height,
        ratio: width !== 0 && height !== 0 ? width / height : 1,
      };
    },
  });
}

function size(
  width: number,
  height: number,
  src: string,
  {
    resize: { ratio: _, ...resize } = { ratio: 0 },
    ...options
  }: OptimizeImageOptions = {},
  name: string,
): Size {
  return {
    width,
    height,
    url: `/resources/image/${name}.webm?token=${encrypt(
      JSON.stringify([
        src,
        { resize: { ...resize, width, height }, ...options },
      ]),
      { iv: imgIv, encoding: 'base64url' },
    )}`,
  };
}

export function decodeImageOpts(
  token: string,
): [
  src: string,
  opts: Omit<OptimizeImageOptions, 'resize'> & { resize?: ResizeOptions },
] {
  try {
    return JSON.parse(decrypt(token, { iv: imgIv, encoding: 'base64url' }));
  } catch (err) {
    throw new Error('Bad image token');
  }
}
