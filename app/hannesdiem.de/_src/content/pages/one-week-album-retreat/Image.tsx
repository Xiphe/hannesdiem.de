import clsx from "clsx";
import {
  StaticImageData,
  StaticImport,
} from "next/dist/shared/lib/get-img-props";
import NextImage from "next/image";
import { PropsWithChildren } from "react";

type ImageDimensions = {
  maxWidth?: string;
  maxHeight?: string;
  aspectRatio?: string;
};

export type ImageProps = ImageDimensions & {
  src: string | StaticImageData;
  alt: string;
  priority?: boolean;
  className?: string;
  sizes?: string;
  title?: string;
  wrapper?: false;
};

function isStaticImageData(src: string | StaticImport): src is StaticImageData {
  return (
    typeof src === "object" &&
    typeof (src as StaticImageData).height !== "undefined"
  );
}

export default function Image({
  src,
  alt,
  priority,
  className,
  sizes,
  children,
  title,
  wrapper,
  ...imageDimensions
}: PropsWithChildren<ImageProps>) {
  const image = (
    <NextImage
      priority={priority}
      className="!m-0 object-cover"
      src={src}
      alt={alt}
      title={title}
      fill
      sizes={sizes}
    />
  );

  if (wrapper === false) {
    return image;
  }

  const styles = {
    ...(isStaticImageData(src)
      ? ({
          aspectRatio: `${src.width}/${src.height}`,
          maxWidth: `${src.width}px`,
          maxHeight: `${src.height}px`,
        } satisfies ImageDimensions)
      : ({
          aspectRatio: "4 / 3",
        } satisfies ImageDimensions)),
    ...imageDimensions,
  };

  return (
    <div className={clsx(className, "relative")} style={styles}>
      {image}
    </div>
  );
}
