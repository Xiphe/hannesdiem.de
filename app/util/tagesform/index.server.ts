import { cachified } from '../cache.server';
import { redisCache } from '../redis.server';
import { z } from 'zod';
import { createHash } from 'crypto';
import { markdownToHtml, stripHtml } from '../markdown.server';
import formatTagesformFeedDate from './formatDate';

const BUCKET_URL = 'https://s3.eu-central-1.amazonaws.com/tagesform';

const ArrayOfStrings = z.array(z.string());
const EpisodeMeta = z.object({
  title: z.string().transform((s) => s.replace(/^Tagesform [0-9]+ - /, '')),
  length: z.number(),
  file: z.string(),
  duration: z.string(),
  season: z.number(),
  episode: z.number(),
  text: z.string(),
  tags: ArrayOfStrings,
  date: z.string(),
  extra: z.object({
    excerpt: z.string().optional(),
    explicit: z.boolean().optional(),
  }),
  image: z.string(),
  transcription: z.string(),
});
type Episode = z.infer<typeof EpisodeMeta> & {
  excerpt: string;
  htmlText: string;
};

async function getEpisodeMeta(fileName: string) {
  return cachified({
    key: `tagesform-s2-meta-${encodeURIComponent(fileName)}`,
    cache: redisCache,
    maxAge: 1000 * 60 * 60 * 24,
    async getFreshValue() {
      const res = await fetch(`${BUCKET_URL}/s2/X/meta/${fileName}`);

      const episode = EpisodeMeta.parse(await res.json());
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

async function getS3Episodes() {
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

      const hash = createHash('sha256')
        .update(JSON.stringify(episodes) + Math.random())
        .digest('hex');

      const lastUpdate = (
        await cachified({
          key: 'tagesform-s2-last-update',
          cache: redisCache,
          checkValue([_, h]: [number, string]) {
            return hash === h ? true : 'content updated';
          },
          async getFreshValue(): Promise<[number, string]> {
            return [Date.now(), hash];
          },
        })
      )[0];

      return { episodes, hash, lastUpdate };
    },
  });
}

export default async function getEpisodesForFeed() {
  const { episodes, lastUpdate } = await getS3Episodes();
  return {
    items: episodes.map(episodeToRssItem).join('\n  '),
    lastUpdate,
  };
}

export function episodeToRssItem({
  title,
  episode,
  season,
  date,
  extra,
  excerpt,
  htmlText,
  file,
  length,
  duration,
  image,
}: Episode) {
  return `
    <item>
      <title>${title}</title>
      <itunes:episode>${episode}</itunes:episode>
      <itunes:season>${season}</itunes:season>
      <enclosure url="${BUCKET_URL}/${file}" length="${length}" type="audio/mpeg" />
      <itunes:duration>${duration}</itunes:duration>
      <itunes:episodeType>full</itunes:episodeType>
      <itunes:author>Hannes Diem</itunes:author>
      <atom:contributor>
        <atom:name>Hannes Diem</atom:name>
        <atom:uri>https://hannesdiem.de/</atom:uri>
      </atom:contributor>
      <link>https://hannesdiem.de/tagesform-${episode}/</link>
      <guid>https://hannesdiem.de/tagesform-${episode}</guid>
      <pubDate>${formatTagesformFeedDate(new Date(date))}</pubDate>
      <itunes:explicit>${
        extra.explicit === true ? 'Yes' : 'No'
      }</itunes:explicit>
      <description>${excerpt}</description>
      <itunes:subtitle>${excerpt}</itunes:subtitle>
      <content:encoded><![CDATA[${htmlText}]]></content:encoded>
      <itunes:summary><![CDATA[${htmlText}]]></itunes:summary>
      <itunes:image href="${BUCKET_URL}/${image}" />
    </item>
  `.trim();
}
