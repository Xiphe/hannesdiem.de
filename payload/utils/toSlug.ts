export function toSlug(input: string) {
  return input
    .toLowerCase() // Convert to lowercase
    .trim() // Remove leading/trailing spaces
    .replace(/[^a-z0-9.-]/g, "-") // Replace unsafe characters with dashes
    .replace(/-+/g, "-") // Replace multiple dashes with a single one
    .replace(/^-+|-+$/g, ""); // Remove trailing and leading dashes
}
