import {
  StaticImageData,
  StaticImport,
} from "next/dist/shared/lib/get-img-props";
import { PropsWithChildren } from "react";
import Image from "./Image";
import clsx from "clsx";

type BgImagesProps = {
  className?: string;
  images: [
    src: StaticImageData,
    alt: string,
    title: string,
    includeStacked?: false
  ][];
};

export default function BgImages({
  images,
  children,
  className,
}: PropsWithChildren<BgImagesProps>) {
  const combinedParallelAspect = images.reduce((memo, [{ width, height }]) => {
    return memo + width / height;
  }, 0);

  const combinedStackedAspect = images.reduce(
    (memo, [{ width, height }, _, __, includeStacked]) => {
      if (includeStacked === false) {
        return memo;
      }

      return memo + height / width;
    },
    0
  );

  const totalWidth = images.reduce(
    (memo, [{ width, height }]) => memo + width,
    0
  );

  return (
    <div className={className}>
      <div
        style={
          {
            "--stacked-aspect": `1 / ${combinedStackedAspect}`,
            "--parallel-aspect": `${combinedParallelAspect} / 1`,
          } as any
        }
      >
        <div className="h-0">
          <div className="bg-images-container sm:flex">
            {images.map(([src, alt, title, includeStacked]) => (
              <Image
                src={src}
                alt={alt}
                sizes={`(max-width: 639px) 100vw, (min-width: 640px) ${
                  Math.round(
                    (src.width / src.height / combinedParallelAspect) * 10000
                  ) / 100
                }vw`}
                key={src.src}
                title={title}
                className={clsx(
                  includeStacked === false ? "hidden sm:block" : "",
                  "w-full"
                )}
              />
            ))}
          </div>
        </div>
        <div className="relative z-10 bg-images-container flex items-center pointer-events-none">
          {children}
        </div>
      </div>
    </div>
  );
}
