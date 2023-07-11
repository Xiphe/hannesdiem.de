import "./globals.css";
import type { Metadata } from "next";

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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
