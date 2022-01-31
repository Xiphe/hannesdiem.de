import type { FitEnum } from 'sharp';

export function optimizedImage({
  src,
  width,
  height,
  fit,
  optimizerUrl = '/resources/image/',
}: {
  src: string;
  width?: number | string;
  height?: number | string;
  fit?: keyof FitEnum;
  optimizerUrl?: string;
}) {
  const params = new URLSearchParams({
    src,
  });
  if (fit) {
    params.set('fit', fit);
  }
  if (width !== undefined) {
    params.set('width', String(width));
  }
  if (height !== undefined) {
    params.set('height', String(height));
  }
  return `${optimizerUrl}?${params.toString()}`;
}
