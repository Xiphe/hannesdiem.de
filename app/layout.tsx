import "./globals.css";
import type { Metadata } from "next";
import SpotifyFeedback from "./spotify/SpotifyFeedback";
import { getOrigin } from "@/utils";
import { Suspense } from "react";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark:bg-blue-900 text-black dark:text-white">
      <body className="bg-gradient-to-b gradient-full">
        {children}
        <Suspense>
          <SpotifyFeedback />
        </Suspense>
      </body>
    </html>
  );
}
