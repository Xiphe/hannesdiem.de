import { Fragment, ReactNode } from "react";

type SkeletonWordProps = { max?: number; min?: number };
export function SkeletonWord({ max, min }: SkeletonWordProps) {
  return generateRandomWord(max, min);
}

type SkeletonParagraphProps = {
  lines?: number;
  maxLineLength?: number;
  space?: string;
};
export function SkeletonParagraph({
  lines = Math.round(1 + Math.random() * 7),
  maxLineLength = 40,
  space = "\u200B",
}: SkeletonParagraphProps) {
  const skeletons: ReactNode[] = [];
  for (let i = 0; i < lines; i++) {
    let currentLine = "";
    const wordsCount = Math.floor(Math.random() * (maxLineLength / 6)) + 3;

    for (let j = 0; j < wordsCount; j++) {
      if (currentLine.length + 6 <= maxLineLength) {
        currentLine += generateRandomWord() + space;
      } else {
        break;
      }
    }

    skeletons.push(
      <Fragment key={i}>
        {currentLine}
        <br />
      </Fragment>,
    );
  }
  return skeletons;
}

export function generateRandomWord(maxLength = 8, minLength = 1) {
  const length =
    Math.floor(Math.random() * (maxLength - minLength)) + minLength;
  return "▇".repeat(length);
}
