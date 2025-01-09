import Header, { HeaderProps } from "@hdx/components/Header";
import Link from "next/link";
import { focusStyles } from "@hdx/styles/styles";
import clsx from "clsx";
import { PropsWithChildren, ReactNode } from "react";
import Footer from "@hdx/components/Footer";
import Image from "next/image";

type BlogLayoutProps = {
  slug: string[];
  banner?: HeaderProps["banner"];
};

export async function BlogLayout({
  slug,
  banner,
  children,
}: PropsWithChildren<BlogLayoutProps>) {
  const breadcrumbs = ["notes"].concat(slug.slice(0, -1));
  return (
    <>
      <Header
        floating={Boolean(banner)}
        sticky
        breadcrumbs={
          <div className="text-stone-400 dark:text-gray-400 inline">
            {[...breadcrumbs].reverse().reduce((children, slug, i, all) => {
              return (
                <span className="text-stone-400 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
                  <Link
                    key={i}
                    href={`/${breadcrumbs.slice(0, all.length - i).join("/")}`}
                    className={clsx(focusStyles, "rounded-sm")}
                  >
                    <span className="text-xl text-stone-400 dark:text-gray-400">
                      /
                    </span>
                    {slug}
                  </Link>
                  {children}
                </span>
              );
            }, null as ReactNode)}
          </div>
        }
      />

      {banner ? (
        <div className="h-[60vh] lg:h-[80vh] relative">
          <Image
            className="absolute inset-0 size-full object-cover"
            alt=""
            fill
            {...banner}
          />
        </div>
      ) : null}

      <main
        className={clsx(
          "max-w-7xl mx-auto p-6 lg:px-8 flex-grow w-full",
          banner
            ? "xl:-mt-12 bg-white dark:bg-gray-900 z-10 relative"
            : "xl:mt-8",
        )}
      >
        {children}
      </main>
      <Footer />
    </>
  );
}
