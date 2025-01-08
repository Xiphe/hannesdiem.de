export function cached<Fn extends (...params: any[]) => any>(
  fn: Fn,
  getCacheKey: (...params: Parameters<Fn>) => string = () => "DEFAULT",
) {
  const cache: Record<string, unknown> = {};

  return (...params: Parameters<Fn>) => {
    const key = getCacheKey(...params);

    if (!cache[key]) {
      cache[key] = fn(...params);
      const promised = cache[key] as Promise<unknown>;
      if ("catch" in promised) {
        promised.catch(() => {
          delete cache[key];
        });
      }
    }

    return cache[key] as ReturnType<Fn>;
  };
}
