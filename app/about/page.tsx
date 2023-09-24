import { Metadata } from "next";

export const metadata = {
  openGraph: {
    type: "profile",
    firstName: "Hannes",
    lastName: "Diem",
  },
} satisfies Metadata;

export default function About() {
  return (
    <h1>Hi I&apos;m Hannes. Don&apos;t really like to talk about myself...</h1>
  );
}
