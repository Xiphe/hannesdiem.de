import { type Image, type Page } from "@/content";
import {
  getOrigin,
  primaryButtonDarkStyles,
  primaryButtonStyles,
  proseStyles,
} from "@/utils";
import { Metadata, ResolvingMetadata } from "next";
import { LocalTime } from "../LocalTime";
import { PropsWithChildren } from "react";
import clsx from "clsx";

export async function generatePageMetadata(
  page: Page,
  searchParams: Record<string, string | string[]>,
  parent: ResolvingMetadata
) {
  const url = new URL(getOrigin());
  url.pathname = page.slug;

  return {
    title: page.externalTitle ?? page.title,
    description: page.description,
    openGraph: {
      title: page.title,
      description: page.description,
      type: "website",
      url: url.href,
    },
  } satisfies Metadata;
}

type OptionBannerProps = PropsWithChildren<{
  image?: Image;
}>;

function OptionBanner({ children, image }: OptionBannerProps) {
  if (!image) {
    return <div className="pt-16 pb-8">{children}</div>;
  }

  return (
    <div
      style={{
        backgroundImage: `url(${image.src})`,
      }}
      className="bg-cover bg-center min-h-[80vh] py-12 flex justify-center items-center mb-12"
    >
      {children}
    </div>
  );
}

function TextOnBanner({
  children,
  active,
}: PropsWithChildren<{ active: boolean }>) {
  if (!active) {
    return children;
  }

  return (
    <div style={{ textShadow: "0 0 50px black, 0 0 5px rgba(0, 0, 0, 0.5)" }}>
      {children}
    </div>
  );
}

export function Page({
  title,
  date,
  dateFormat,
  subtitle,
  Content,
  banner,
  cta,
  description,
}: Page & {
  searchParams: Record<string, string | string[]>;
}) {
  // <div className="prose lg:prose-xl dark:prose-invert mx-auto px-4 pt-16 pb-24">
  return (
    <div className="">
      <OptionBanner image={banner}>
        <div className="prose lg:prose-xl prose-invert mx-auto px-4">
          <TextOnBanner active={Boolean(banner)}>
            <h1 className="mb-0 lg:mb-0">{title}</h1>
            {subtitle ? (
              <h2 className="mt-2 mb-0 lg:mt-4 lg:mb-0 opacity-80">
                {subtitle}
              </h2>
            ) : null}
          </TextOnBanner>
          {date ? <LocalTime timeStamp={date} format={dateFormat} /> : null}
          {cta ? (
            <div className="flex content-center justify-center mt-12">
              <a
                href="mailto:album-retreat@hannesdiem.de"
                className={primaryButtonDarkStyles}
              >
                Join us!
              </a>
            </div>
          ) : null}
        </div>
      </OptionBanner>

      <Content components={{ wrapper: DefaultWrapper }} />
    </div>
  );
}

function DefaultWrapper({ children }: PropsWithChildren) {
  return (
    <div className={clsx(proseStyles, "mx-auto px-4 pb-24")}>{children}</div>
  );
}
