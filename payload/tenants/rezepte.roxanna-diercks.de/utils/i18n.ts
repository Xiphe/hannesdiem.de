import z from "zod";

export const LanguageSchema = z.union([
  z.literal("en"),
  z.literal("de"),
  z.literal("es"),
]);

export type Language = z.TypeOf<typeof LanguageSchema>;

export const LANGUAGES = LanguageSchema._def.options.map((l) => l._def.value);

export type Translated<T> = Record<Language, T>;
