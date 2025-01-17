import "./_src/styles/styles.build.css";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { getOrigin } from "@utils/origin";
import { PropsWithChildren } from "react";

import { Licorice, Montserrat_Alternates } from "next/font/google";
import { LightDirectionProvider } from "@utils/light-tailwind-plugin/ElementDirection";

const licorice = Licorice({
  subsets: ["latin"],
  weight: "400",
  display: "block",
  variable: "--font-licorice",
});

const montserratAlternates = Montserrat_Alternates({
  subsets: ["latin"],
  weight: "400",
  display: "block",
  variable: "--font-montserrat-alternates",
});

export async function generateMetadata() {
  const origin = await getOrigin();
  return {
    metadataBase: new URL(origin),
    applicationName: "Gedankenfluss",
    title: {
      template: "%s • Gedankenfluss",
      default: "Gedankenfluss",
    },
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

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html
      lang={"de"}
      className={`${licorice.variable} ${montserratAlternates.variable} bg-paper-50 text-ink dark:bg-water-900 dark:text-graphite-50`}
    >
      <LightDirectionProvider>
        <body className="font-montserrat">
          {children}
          <Analytics />
        </body>
      </LightDirectionProvider>
    </html>
  );
}
