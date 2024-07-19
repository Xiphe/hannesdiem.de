import "../globals.css";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import SpotifyFeedback from "./spotify/SpotifyFeedback";
import { getOrigin } from "@/utils";
import { PropsWithChildren, Suspense } from "react";
import { Theme, electrocuteTheme } from "../themes";

export async function generateMetadata() {
  const origin = getOrigin();
  return {
    metadataBase: new URL(origin),
    applicationName: "Hannes Diem",
    title: {
      template: "%s • Hannes Diem",
      default: "Hannes Diem",
    },
    description: "...about Music, Life, and Everything",
    icons: {
      icon: "/logo.svg",
      shortcut: "/logo.svg",
      apple: "/logo.svg",
    },
    openGraph: {
      type: "website",
    },
  } satisfies Metadata;
}

export type LayoutProps = PropsWithChildren<{
  lang?: string;
  theme?: Theme;
}>;

export default function RootLayout({
  children,
  theme = electrocuteTheme,
  lang = "en",
}: LayoutProps) {
  return (
    <html lang={lang} className={theme.htmlStyles}>
      <body className={theme.bodyStyles}>
        {children}
        <Suspense>
          <SpotifyFeedback />
        </Suspense>
        <Analytics />
      </body>
    </html>
  );
}
