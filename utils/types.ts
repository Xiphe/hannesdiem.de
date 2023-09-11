export interface PageProps<
  Params extends Record<string, string> | never = never
> {
  params: Params;
  searchParams: Record<string, string | string[]>;
}
