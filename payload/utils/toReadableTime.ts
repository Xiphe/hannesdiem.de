export function toToReadableTime(minutes: number): string {
  // Calculate hours, minutes, and seconds
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = Math.floor(minutes % 60);
  const seconds = Math.round((minutes % 1) * 60); // Extract the fractional part to calculate seconds

  // Prepare an array to store time components
  const timeComponents: string[] = [];

  // Add hours if greater than 0
  if (hours > 0) {
    timeComponents.push(`${hours} hour${hours > 1 ? "s" : ""}`);
  }

  // Add minutes if greater than 0 or if there are hours
  if (remainingMinutes > 0 || hours > 0) {
    timeComponents.push(
      `${remainingMinutes} minute${remainingMinutes !== 1 ? "s" : ""}`,
    );
  }

  // Add seconds if greater than 0
  if (seconds > 0) {
    timeComponents.push(`${seconds} second${seconds !== 1 ? "s" : ""}`);
  }

  // Combine components with commas, adding 'and' before the last item
  if (timeComponents.length > 1) {
    const last = timeComponents.pop(); // Remove last item
    return `${timeComponents.join(", ")} and ${last}`;
  }

  return timeComponents[0] || "0 seconds";
}
