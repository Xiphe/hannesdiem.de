import { proseStyles } from "@/utils";
import clsx from "clsx";
import {
  StaticImageData,
  StaticImport,
} from "next/dist/shared/lib/get-img-props";
import NextImage from "next/image";
import { PropsWithChildren, useId } from "react";

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
  const id = useId();
  const { aspectRatio, maxWidth, maxHeight } = {
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
      <div style={{ aspectRatio, maxWidth, maxHeight }} className={className}>
        <div style={{ height: 0 }}>
          <div
            className={clsx("relative overflow-hidden mx-auto")}
            style={{ aspectRatio, maxWidth, maxHeight }}
          >
            <NextImage
              priority={priority}
              className="!m-0"
              src={src}
              alt={alt}
              fill
              sizes={sizes}
            />
          </div>
        </div>
        {children ? (
          <>
            <div
              style={{ aspectRatio, width: "40%" }}
              className="sm:hidden"
            ></div>
            <div className={clsx("relative z-1 mx-auto mt-8", proseStyles, "")}>
              <div
                className={clsx(
                  "mx-4 px-4 pt-4 pb-6 md:px-8 md:-mx-8 bg-white/60 dark:bg-blue-900/60 backdrop-blur-lg",
                  `image-text`
                )}
              >
                {children}
              </div>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
}
