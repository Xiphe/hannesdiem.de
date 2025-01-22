export function normalizeLine(
  text: string | (string | null)[],
  maxLineLength: number = 28,
) {
  if (typeof text === "string") {
    return text
      .split(/\n|\r\n/g)
      .map((line) => {
        if (line.trim() === "") return null;
        const lines: string[] = [""];
        line.split(" ").forEach((word) => {
          if (lines.at(-1)!.length + word.length > maxLineLength) {
            lines.push(word);
          } else {
            lines.splice(-1, 1, String(lines.at(-1)! + " " + word).trim());
          }
        });

        return lines;
      })
      .flat();
  }
  return text;
}
