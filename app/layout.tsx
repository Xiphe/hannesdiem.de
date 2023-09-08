import "./globals.css";
import type { Metadata } from "next";
import SpotifyFeedback from "./spotify/SpotifyFeedback";

export const metadata: Metadata = {
  title: "Hannes Diem",
  description: "...about Music, Life, and Everything",
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark:bg-blue-900 text-black dark:text-white">
      <body className="bg-gradient-to-b gradient-full">
        {children}
        <SpotifyFeedback />
      </body>
    </html>
  );
}
