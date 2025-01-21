import { cx } from "@gf/cx";
import { focusStyles, footerLinkStyles } from "@gf/styles/styles";
import Link from "next/link";
import { PropsWithChildren } from "react";

type LinkGroup = {
  title: string;
  links: {
    href: string;
    label: string;
  }[];
};

const contactLinks: LinkGroup = {
  title: "Kontakt",
  links: [
    {
      href: "https://www.instagram.com/dein_gedankenfluss/",
      label: "Instagram",
    },
    {
      href: "https://www.facebook.com/profile.php?id=61570476373100",
      label: "Facebook",
    },
    { href: "https://pin.it/2Af6qPBaf", label: "Pinterest" },
    { href: "mailto:support@dein-gedankenfluss.de", label: "Email" },
  ],
};

const LegalLinks: LinkGroup = {
  title: "Gedankenfluss",
  links: [
    { href: "/", label: "Startseite" },
    { href: "/impressum", label: "Impressum" },
    { href: "/datenschutz", label: "Datenschutz" },
    { href: "/widerruf", label: "Widerrufsbelehrung" },
  ],
};

const footerLinks = [contactLinks, LegalLinks];

type FooterProps = PropsWithChildren<{
  extraLinks?: LinkGroup[];
  className?: string;
}>;

export function Footer({ children, className, extraLinks }: FooterProps) {
  return (
    <footer className={className}>
      <div className="container mx-auto text-lg px-8 pb-16 text-graphite-200 flex flex-col gap-8 md:flex-row md:gap-16 lg:gap-32">
        {[footerLinks[0], ...(extraLinks ?? []), ...footerLinks.slice(1)].map(
          (group) => (
            <nav key={group.title}>
              <h4 className="text-xl font-bold text-graphite-50 mb-2">
                {group.title}
              </h4>
              <ul>
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      {...(link.href.startsWith("http")
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className={cx(footerLinkStyles, focusStyles)}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ),
        )}
      </div>
      {children}
    </footer>
  );
}
