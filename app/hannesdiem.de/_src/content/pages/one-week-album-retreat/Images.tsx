import { proseStyles } from "@/utils";
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
  ...imageDimensions
}: PropsWithChildren<ImageProps>) {
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
    <>
      <div className={clsx("relative sm:py-16", className)}>
        <NextImage
          priority={priority}
          className="!m-0 object-cover hidden sm:block"
          src={src}
          alt={alt}
          fill
          sizes={sizes}
        />
        <div className={clsx("relative z-1 mx-auto", proseStyles, "")}>
          <div
            className={clsx(
              "px-2 pt-4 pb-6 sm:px-8 sm:-mx-8 sm:bg-white/60 sm:dark:bg-blue-900/60 sm:backdrop-blur-lg",
              `image-text`
            )}
          >
            {children}
          </div>
        </div>
      </div>
      <div className="relative sm:hidden" style={styles}>
        <NextImage
          priority={priority}
          className="!m-0  sm:hidden"
          src={src}
          alt={alt}
          fill
          sizes={sizes}
        />
      </div>
    </>
  );
}
