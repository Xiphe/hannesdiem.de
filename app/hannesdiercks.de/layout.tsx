import "./_src/styles/styles.build.css";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { getOrigin } from "@utils/origin";
import { PropsWithChildren } from "react";

export async function generateMetadata() {
  const origin = await getOrigin();
  return {
    metadataBase: new URL(origin),
    title: {
      template: "%s • I'm Hannes",
      default: "I'm Hannes",
    },
    // description: "...about Life, Music, Programming and Everything",
    // icons: {
    //   icon: "/logo.svg",
    //   shortcut: "/logo.svg",
    //   apple: "/logo.svg",
    // },
    openGraph: {
      type: "website",
    },
  } satisfies Metadata;
}

export type LayoutProps = PropsWithChildren;

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang={"en"}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
