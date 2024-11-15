import { Author } from "@/content";
import clsx from "clsx";
import { LocalTime } from "./LocalTime";
import { focusStyles } from "@/utils";
import { ComponentPropsWithoutRef, Fragment } from "react";

export interface LetterProps {
  title: string;
  subtitle?: string;
  authors?: Author[];
  TitleComponent?: React.ElementType<ComponentPropsWithoutRef<"h2">>;
  SubTitleComponent?: React.ElementType<ComponentPropsWithoutRef<"h3">>;
  createdDate: number;
  createdDateFormat?: Intl.DateTimeFormatOptions;
  children?: React.ReactNode;
}

export function Letter({
  title,
  subtitle,
  authors,
  TitleComponent = "h2",
  SubTitleComponent = "h3",
  createdDate,
  createdDateFormat,
  children,
}: LetterProps) {
  return (
    <div
      className={clsx(
        "prose lg:prose-xl dark:prose-invert shadow-2xl pl-8 pr-4 sm:pl-24 sm:pr-12 pt-16 pb-24",
        "font-serif mx-auto sm:my-16 bg-orange-50  text-blue-800 dark:bg-gray-950 dark:text-yellow-50"
      )}
    >
      <TitleComponent className="!my-2 text-center pr-4 sm:pr-12">
        {title}
      </TitleComponent>
      {subtitle ? (
        <SubTitleComponent className="!mt-2 !mb-4 italic font-light text-center pr-4 sm:pr-12">
          {subtitle}
        </SubTitleComponent>
      ) : null}
      <p className="font-fuggles text-4xl text-center pr-4 sm:pr-12 !mt-2 mb-8">
        {authors?.map(({ name, description, link }, i) => (
          <Fragment key={name + link}>
            {link ? (
              <a
                title={description}
                href={link}
                key={name}
                target="_blank"
                rel="noopener"
                className={clsx(focusStyles, "rounded-md")}
              >
                {name}
              </a>
            ) : (
              <span key={name} title={description}>
                {name}
              </span>
            )}
            {i < authors.length - 1 ? ", " : null}
          </Fragment>
        ))}
        {authors?.length ? " - " : null}
        <LocalTime timeStamp={createdDate} format={createdDateFormat} />
      </p>

      {children}
    </div>
  );
}
