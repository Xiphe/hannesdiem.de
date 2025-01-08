"use client";

import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { PropsWithChildren, ReactNode, useState } from "react";
import { focusStyles } from "../styles/styles";

const navigation: { name: string; href: string }[] = [
  // { name: "CV", href: "/cv" },
  // { name: "Blog", href: "#" },
  // { name: "Creations", href: "#" },
];

export type HeaderProps = {
  wide?: boolean;
  banner?: { src: string; alt?: string };
  breadcrumbs?: ReactNode;
  sticky?: boolean;
  floating?: boolean;
  bg?: boolean;
};
export default function Header({
  floating,
  sticky,
  wide,
  breadcrumbs,
  bg,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      className={clsx(
        (floating || sticky) && "inset-x-0 top-0 z-50 ",
        floating && !sticky && "absolute h-0",
        floating && sticky && "sticky h-0",
        !floating && sticky && "sticky",
      )}
    >
      <div
        className={clsx(
          (sticky || bg) && "bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl",
        )}
      >
        <nav
          aria-label="Global"
          className={clsx(
            "flex items-baseline justify-between p-6 lg:px-8",
            !wide && "max-w-7xl mx-auto",
          )}
        >
          <div>
            <a
              href="/#"
              className={clsx(
                focusStyles,
                "-m-1.5 p-1.5 rounded-sm text-gray-900 dark:text-white font-serif text-xl",
              )}
            >
              Hannes Diercks
            </a>
            {breadcrumbs}
          </div>

          {navigation.length ? (
            <>
              <div className="flex lg:hidden">
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(true)}
                  className={clsx(
                    focusStyles,
                    "-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 dark:text-gray-400",
                    mobileMenuOpen && " opacity-0",
                  )}
                >
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon aria-hidden="true" className="size-6" />
                </button>
              </div>
              <div className="hidden lg:flex lg:gap-x-12">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={clsx(
                      focusStyles,
                      "text-sm/6 rounded-sm font-semibold text-gray-800 dark:text-white",
                    )}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </>
          ) : null}
        </nav>
      </div>
      {navigation.length ? (
        <Dialog
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
          className="lg:hidden"
        >
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-stone-100/70 backdrop-blur-xl dark:bg-gray-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-white/10">
            <div className="flex items-center justify-end">
              {/* <a href="/#" className="-m-1.5 p-1.5">
          Hannes Diercks
        </a> */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className={clsx(
                  focusStyles,
                  "-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-gray-400",
                )}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/25">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={clsx(
                        focusStyles,
                        "-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-800 hover:bg-stone-200 dark:text-white dark:hover:bg-gray-800",
                      )}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                {/* <div className="py-6">
            <a
              href="#"
              className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-white hover:bg-gray-800"
            >
              Log in
            </a>
          </div> */}
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      ) : null}
    </header>
  );
}
