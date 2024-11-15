export interface Params<
  Params extends Record<string, string | string[]> | never = never
> {
  params: Promise<Params>;
}

export interface PageProps<
  T extends Record<string, string | string[]> | never = never
> extends Params<T> {
  searchParams: Promise<Record<string, string | string[]>>;
}
