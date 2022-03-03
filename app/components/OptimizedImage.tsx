import type { ComponentPropsWithoutRef } from 'react';
import type { Size } from '~/util/optimizedImage.server';

export type OptimizedImageProps = {
  colors: {
    average: string;
    dominant: string;
    min: string;
    max: string;
  };
  sizes: Size[];
  maxWidth: number | false;
  ratio: number;
};

export default function OptimizedImage({
  sizes,
  maxWidth,
  ratio,
  colors,
  style,
  ...rest
}: Omit<ComponentPropsWithoutRef<'img'>, 'src' | 'srcSet' | 'sizes'> &
  OptimizedImageProps) {
  let largestImageWidth = 0;
  let largestImageSrc: string | undefined;
  const srcSet = sizes
    .map(({ width, url }) => {
      if (largestImageWidth < width) {
        largestImageWidth = width;
        largestImageSrc = url;
      }
      return `${url} ${width}w`;
    })
    .join(', ');

  return (
    <img
      {...rest}
      sizes="100vw"
      src={largestImageSrc}
      srcSet={srcSet}
      style={{
        backgroundColor: colors.dominant,
        width: '100%',
        maxWidth: maxWidth || undefined,
        aspectRatio: `${Math.round(ratio * 1000) / 1000}/1`,
        ...style,
      }}
    />
  );
}
