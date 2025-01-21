import { Fragment, PropsWithChildren } from "react";
import { GedankenflussLogoRaportExtended } from "./GedankenflussLogo";
import Link from "next/link";
import { cx } from "@gf/cx";
import { focusStyles, linkStyles } from "@gf/styles/styles";
import { ScrollAnchor } from "./ScrollAnchor";

const navItems = [
  { label: "Karten", href: "/cards-test#karten" },
  { label: "Fotos", href: "/cards-test#fotos" },
  // { label: "Newsletter", href: "/cards-test#newsletter" },
  { label: "Über uns", href: "/cards-test#ueber-uns" },
];

export function Header({ children }: PropsWithChildren) {
  return (
    <header className="pb-4">
      <GedankenflussLogoRaportExtended
        href="/"
        className="text-paper bg-gradient-to-b from-water-900 to-transparent pt-4 pb-24"
      >
        <nav className="h-full items-center ml-4 hidden md:flex">
          <ul className="flex gap-3">
            {navItems.map((item, index) => (
              <Fragment key={item.href}>
                <li>
                  <ScrollAnchor
                    tabIndex={0}
                    href={item.href}
                    className={cx(
                      linkStyles,
                      focusStyles,
                      "rounded-sm md:text-lg",
                    )}
                  >
                    {item.label}
                  </ScrollAnchor>
                </li>
                {index < navItems.length - 1 && (
                  <li
                    className="dark:text-paper pointer-events-none select-none"
                    aria-hidden
                  >
                    &bull;
                  </li>
                )}
              </Fragment>
            ))}
          </ul>
        </nav>
      </GedankenflussLogoRaportExtended>
      {children}
    </header>
  );
}
