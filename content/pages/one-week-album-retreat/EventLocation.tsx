import {
  bareBaseButtonStyles,
  buttonColorStyles,
  primaryButtonDarkColors,
} from "@/utils";
import clsx from "clsx";
import { StaticImageData } from "next/dist/shared/lib/get-img-props";
import NextImage from "next/image";

export interface EventLocationProps {
  title: string;
  date: string;
  image: StaticImageData;
  alt: string;
  waitList?: boolean;
  cta?: string;
  ctaHref?: string;
}

export default function EventLocation({
  title,
  date,
  image,
  alt,
  waitList,
  cta,
  ctaHref,
}: EventLocationProps) {
  const Container = ctaHref || waitList ? "a" : "div";

  return (
    <Container
      className={clsx(
        "w-2/3 sm:w-2/5 lg:w-1/5 max-w-72 block text-center",
        waitList && "opacity-65"
      )}
      href={
        waitList
          ? `mailto:oneweekalbum@hannesdiem.de?subject=${encodeURIComponent(
              `One Week Album in ${title}`
            )}&body=${encodeURIComponent(
              `Hey Roxy & Hannes,\n\nI'm interested in joining you for the One Week Album retreat in ${date}.\nLet's discuss dates and location soon.\n\nCheers`
            )}`
          : ctaHref
      }
      target={ctaHref ? "_blank" : undefined}
      rel="noreferrer noopener"
    >
      <h3 className="text-left px-3 py-1 bg-[var(--box-headline)] relative z-10">
        <span className="font-bold text-xl">{title}</span>
        <br />
        <span className="text-sm">{date}</span>
      </h3>
      <span className="w-full p-2 -mt-20 block">
        <span className="relative aspect-square w-full rounded-3xl overflow-hidden block">
          <NextImage
            src={image}
            alt={alt}
            className="object-cover"
            sizes="25vw"
            fill
          />
        </span>
      </span>
      {cta || waitList ? (
        <span className="-mt-8 block relative z-10">
          <span
            className={clsx(
              bareBaseButtonStyles,
              "px-4 py-2 border-2 text-lg",
              waitList ? buttonColorStyles : primaryButtonDarkColors
            )}
          >
            <span className={waitList ? "font-normal" : ""}>
              {waitList ? "Join Scheduling" : cta}
            </span>
          </span>
        </span>
      ) : null}
    </Container>
  );
}
