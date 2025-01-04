export function toSlug(input: string) {
  return input
    .toLowerCase() // Convert to lowercase
    .trim() // Remove leading/trailing spaces
    .replace(/[^a-z0-9.-]/g, "_") // Replace unsafe characters with underscores
    .replace(/_+/g, "_") // Replace multiple underscores with a single one
    .replace(/^_+|_+$/g, "");
}
