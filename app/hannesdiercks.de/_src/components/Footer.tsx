import {
  DevicePhoneMobileIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import { ComponentPropsWithoutRef, ReactNode } from "react";
import { focusStyles } from "../styles/styles";

const footerNavigation = {
  links: [
    { name: "Impressum", href: "https://xiphe.net/impressum/" },
    { name: "Datenschutz", href: "https://xiphe.net/datenschutz/" },
  ],
  contact: [
    {
      href: "mailto:contact@hannesdiercks.de",
      children: "contact@hannesdiercks.de",
      className: "",
      icon: <EnvelopeIcon />,
    },
    {
      href: "tel:004915140511198",
      children: "+49 (0)151 405 111 98",
      icon: <DevicePhoneMobileIcon />,
    },
    {
      href: "https://github.com/Xiphe",
      children: "@Xiphe",
      target: "_blank",
      rel: "noopener noreferrer",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 496 512"
          className="fill-current"
        >
          <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
        </svg>
      ),
    },
    {
      href: "https://bsky.app/profile/xiphe.net",
      children: "@xiphe.net",
      target: "_blank",
      rel: "noopener noreferrer",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          className="fill-current"
        >
          {/*<!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->*/}
          <path d="M111.8 62.2C170.2 105.9 233 194.7 256 242.4c23-47.6 85.8-136.4 144.2-180.2c42.1-31.6 110.3-56 110.3 21.8c0 15.5-8.9 130.5-14.1 149.2C478.2 298 412 314.6 353.1 304.5c102.9 17.5 129.1 75.5 72.5 133.5c-107.4 110.2-154.3-27.6-166.3-62.9l0 0c-1.7-4.9-2.6-7.8-3.3-7.8s-1.6 3-3.3 7.8l0 0c-12 35.3-59 173.1-166.3 62.9c-56.5-58-30.4-116 72.5-133.5C100 314.6 33.8 298 15.7 233.1C10.4 214.4 1.5 99.4 1.5 83.9c0-77.8 68.2-53.4 110.3-21.8z" />
        </svg>
      ),
    },
  ] satisfies (ComponentPropsWithoutRef<"a"> & { icon?: ReactNode })[],
};

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="md:grid md:grid-cols-2 md:gap-8">
          <div>
            <h3 className="font-serif text-xl dark:text-white">
              Hannes Diercks
            </h3>
            <ul role="list" className="mt-6 space-y-2" id="footer-contact">
              {footerNavigation.contact.map(
                ({ className, children, icon, ...props }) => (
                  <li key={props.href}>
                    <a
                      className={clsx(
                        className,
                        focusStyles,
                        "text-sm rounded-sm text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white inline-flex items-center gap-2 pr-1",
                      )}
                      {...props}
                    >
                      <span className="shrink-0 w-5">{icon}</span>{" "}
                      <span>{children}</span>
                    </a>
                  </li>
                ),
              )}
            </ul>
          </div>
          <div className="mt-10 md:mt-0">
            <h3 className="text-xl text-white">&nbsp;</h3>
            <ul role="list" className="md:mt-6 space-y-2">
              {footerNavigation.links.map((item) => (
                <li key={item.name} className="flex md:justify-end">
                  <a
                    href={item.href}
                    className={clsx(
                      focusStyles,
                      "text-sm rounded-sm text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white flex items-center gap-2",
                    )}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
