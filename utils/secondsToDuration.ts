export function secondsToDuration(
  seconds: number,
  format: "human" | "iso8601" = "human"
) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds - hours * 3600) / 60);
  const remainingSeconds = seconds - hours * 3600 - minutes * 60;

  switch (format) {
    case "human":
      return [
        hours > 0 ? hours.toString().padStart(2, "0") : null,
        minutes.toString().padStart(2, "0"),
        remainingSeconds.toString().padStart(2, "0"),
      ]
        .filter(Boolean)
        .join(":");
    case "iso8601":
      return `PT${hours}H${minutes}M${remainingSeconds}S`;
  }
}
