import cachified, {
  CachifiedOptions,
  mergeReporters,
  CreateReporter,
} from "@epic-web/cachified";

/* TODO: bring to cachified */
export function configure<
  ConfigureValue extends unknown,
  Opts extends Partial<CachifiedOptions<ConfigureValue>>,
>(defaultOptions: Opts, defaultReporter?: CreateReporter<ConfigureValue>) {
  return <Value>(
    options: Omit<CachifiedOptions<Value>, keyof Opts> &
      Partial<
        Pick<
          CachifiedOptions<Value>,
          Extract<keyof Opts, keyof CachifiedOptions<Value>>
        >
      >,
    reporter?: CreateReporter<Value>,
  ) =>
    cachified(
      {
        ...defaultOptions,
        ...options,
      } as any as CachifiedOptions<Value>,
      mergeReporters(defaultReporter as any as CreateReporter<Value>, reporter),
    );
}
