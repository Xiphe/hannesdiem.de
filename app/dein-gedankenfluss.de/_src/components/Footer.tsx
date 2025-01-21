import { cx } from "@gf/cx";
import { focusStyles, footerLinkStyles } from "@gf/styles/styles";
import Link from "next/link";
import { PropsWithChildren } from "react";

export async function Footer({ children }: PropsWithChildren) {
  return (
    <footer>
      <div className="container mx-auto text-lg px-8 pb-16 text-ink-800 dark:text-paper-200">
        <nav>
          <ul>
            <li className="mb-2">
              <Link
                href="/"
                className={cx(
                  footerLinkStyles,
                  focusStyles,
                  "font-bold text-xl text-ink-950 dark:text-paper",
                )}
              >
                Gedankenfluss
              </Link>
            </li>
            {children}

            <li>
              <Link
                href="https://www.instagram.com/dein_gedankenfluss/"
                className={cx(footerLinkStyles, focusStyles)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </Link>
            </li>
            <li>
              <Link
                href="https://www.facebook.com/profile.php?id=61570476373100"
                className={cx(footerLinkStyles, focusStyles)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook
              </Link>
            </li>
            <li>
              <Link
                href="https://pin.it/2Af6qPBaf"
                className={cx(footerLinkStyles, focusStyles)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Pinterest
              </Link>
            </li>
          </ul>
        </nav>

        <nav className="mt-6">
          <ul>
            <li>
              <Link
                href="/impressum"
                className={cx(footerLinkStyles, focusStyles)}
              >
                Impressum
              </Link>
            </li>
            <li>
              <Link
                href="/datenschutz"
                className={cx(footerLinkStyles, focusStyles)}
              >
                Datenschutz
              </Link>
            </li>
            <li>
              <Link
                href="/widerruf"
                className={cx(footerLinkStyles, focusStyles)}
              >
                Widerrufsbelehrung
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
