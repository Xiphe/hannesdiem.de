export function omitNullable<T extends unknown>(
  entry: T,
): entry is NonNullable<T> {
  return Boolean(entry);
}
