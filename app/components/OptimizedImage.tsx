/**
 * 👏 jacob
 * https://github.com/jacob-ebey/remix-ecommerce/blob/4c47e73cbef231b86bf83b562d87a3d857b352fa/app/components/optimized-image.tsx
 */
import type { ComponentPropsWithoutRef } from 'react';
import { optimizedImage } from '~/util/optimizedImage';

export function OptimizedImage({
  optimizerUrl,
  responsive,
  src,
  ...rest
}: Omit<ComponentPropsWithoutRef<'img'>, 'src'> & {
  src: string;
  optimizerUrl?: string;
  responsive?: {
    maxWidth?: number;
    size: { width: number; height: number };
  }[];
}) {
  let props: ComponentPropsWithoutRef<'img'> = {
    src: optimizedImage({
      src,
      optimizerUrl,
      width: rest.width,
      height: rest.height,
    }),
  };

  let largestImageWidth = 0;
  let largestImageSrc: string | undefined;
  if (responsive && responsive.length) {
    let srcSet = '';
    let sizes = '';
    for (let { maxWidth, size } of responsive) {
      if (srcSet) {
        srcSet += ', ';
      }
      let srcSetUrl = `${optimizedImage({
        src,
        optimizerUrl,
        width: size.width,
        height: size.height,
      })} ${size.width}w`;
      srcSet += srcSetUrl;

      if (maxWidth) {
        if (sizes) {
          sizes += ', ';
        }
        sizes += `(max-width: ${maxWidth}px) ${size.width}px`;
      }

      if (size.width > largestImageWidth) {
        largestImageWidth = size.width;
        largestImageSrc = srcSetUrl;
      }
    }
    props.srcSet = srcSet;
    props.sizes = sizes || '100vw';
    props.src = '';
  }

  if (largestImageSrc && (!rest.width || largestImageWidth > rest.width)) {
    props.src = largestImageSrc;
  }

  return <img {...rest} {...props} />;
}
