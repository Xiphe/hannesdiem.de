import clsx from "clsx";
import NextImage from "next/image";

export type ImageProps = {
  src: string;
  alt: string;
  aspectRatio?: string;
  priority?: boolean;
  className?: string;
  sizes?: string;
};

export default function Image({
  src,
  alt,
  aspectRatio = "4 / 3",
  priority,
  className,
  sizes = "(max-width: 768px) 100vw, 50vw",
}: ImageProps) {
  return (
    <div
      className={clsx("relative overflow-hidden", className)}
      style={{ aspectRatio }}
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
  );
}
