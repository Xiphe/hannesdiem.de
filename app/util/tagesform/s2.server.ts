import { cachified } from '../cache.server';
import { redisCache } from '../redis.server';
import { z } from 'zod';
import { markdownToHtml, stripHtml } from '../markdown.server';
import { BUCKET_URL, EpisodeSchema } from './common';
import { lastUpdate } from '../lastUpdate';

const ArrayOfStrings = z.array(z.string());

async function getEpisodeMeta(fileName: string) {
  return cachified({
    key: `tagesform-s2-meta-${encodeURIComponent(fileName)}`,
    cache: redisCache,
    maxAge: 1000 * 60 * 60 * 24,
    async getFreshValue() {
      const res = await fetch(`${BUCKET_URL}/s2/X/meta/${fileName}`);

      const episode = EpisodeSchema.parse(await res.json());
      const htmlText = await markdownToHtml(episode.text);
      const excerpt =
        episode.extra.excerpt ||
        (await stripHtml(htmlText.split('<!-- more -->')[0]));

      return {
        ...episode,
        htmlText,
        excerpt,
      };
    },
  });
}

export default async function getS2Episodes() {
  return cachified({
    key: 'tagesform-s2-episodes',
    cache: redisCache,
    maxAge: 1000 * 60 * 60,
    async getFreshValue() {
      const res = await fetch(`${BUCKET_URL}/s2/X/meta/index.json`);
      const index = ArrayOfStrings.parse(await res.json());

      const episodes = (await Promise.all(index.map(getEpisodeMeta))).sort(
        ({ episode: a }, { episode: b }) => b - a,
      );

      return {
        episodes,
        lastUpdate: await lastUpdate({
          data: episodes,
          key: 'tagesform-s2-last-update',
          cache: redisCache,
        }),
      };
    },
  });
}
