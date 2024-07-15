export interface Params<
  Params extends Record<string, string | string[]> | never = never
> {
  params: Params;
}

export interface PageProps<
  T extends Record<string, string | string[]> | never = never
> extends Params<T> {
  searchParams: Record<string, string | string[]>;
}
