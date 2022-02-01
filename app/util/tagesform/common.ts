import { z } from 'zod';

export const EpisodeSchema = z.object({
  title: z
    .string()
    .transform((s) => s.replace(/^Tagesform [0-9.]+\s*-/, '').trim()),
  length: z.number(),
  file: z.string(),
  duration: z.string(),
  season: z.number(),
  episode: z.number(),
  text: z.string(),
  tags: z.array(z.string()),
  date: z.string(),
  extra: z.object({
    excerpt: z.string().optional(),
    explicit: z.boolean().optional(),
  }),
  image: z.string(),
  transcription: z.string(),
});

export type Episode = z.infer<typeof EpisodeSchema> & {
  excerpt: string;
  htmlText: string;
};

export const BUCKET_URL = 'https://s3.eu-central-1.amazonaws.com/tagesform';
