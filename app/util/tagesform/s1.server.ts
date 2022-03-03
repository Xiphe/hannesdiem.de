import { cachified } from '../cache.server';
import { redisCache } from '../redis.server';
import { z } from 'zod';
import { markdownToHtml, stripHtml } from '../markdown.server';
import github from '../github.server';
import fm from 'front-matter';
import { BUCKET_URL, Episode, EpisodeSchema } from './common';
import { lastUpdate } from '../lastUpdate';

const CONTENT_REPO = {
  owner: 'Xiphe',
  repo: 'hannesdiem.de',
};

async function getIndex() {
  const repoRoot = await github.rest.git.getTree({
    ...CONTENT_REPO,
    tree_sha: 'master',
  });

  const postsFolder = repoRoot.data.tree.find(
    ({ path, type }) => path === '_posts' && type === 'tree',
  );
  if (!postsFolder || !postsFolder.sha) {
    throw new Error('_posts folder gone...');
  }

  const posts = await github.rest.git.getTree({
    ...CONTENT_REPO,
    tree_sha: postsFolder.sha,
  });

  const tagesformFolder = posts.data.tree.find(
    ({ path, type }) => path === 'tagesform' && type === 'tree',
  );
  if (!tagesformFolder || !tagesformFolder.sha) {
    throw new Error('tagesformFolder folder gone...');
  }

  const tagesformPosts = await github.rest.git.getTree({
    ...CONTENT_REPO,
    tree_sha: tagesformFolder.sha,
  });

  return tagesformPosts.data.tree
    .map(({ sha }) => sha)
    .filter((v): v is string => !!v);
}

const AttrSchema = z.object({
  cover: z.string(),
  episode: z.number(),
  title: EpisodeSchema.shape.title,
  tags: z.string().transform((s) => s.split(' ').map((t) => t.trim())),
  date: z.date(),
});
const MetaSchema = z.object({
  length: EpisodeSchema.shape.length,
  duration: EpisodeSchema.shape.duration,
  episode: EpisodeSchema.shape.episode,
  transcription: EpisodeSchema.shape.transcription,
});

function getEpisode(sha: string): Promise<Episode> {
  return cachified({
    key: `tagesform-s1-episode-v2-${sha}`,
    cache: redisCache,
    async getFreshValue() {
      const res = await github.rest.git.getBlob({
        ...CONTENT_REPO,
        file_sha: sha,
      });
      if (res.data.encoding !== 'base64') {
        throw new Error(`Unexpected ${res.data.encoding} encoding`);
      }
      const content = Buffer.from(res.data.content, res.data.encoding).toString(
        'utf-8',
      );

      const parsedContent = fm(content);
      const attributes = AttrSchema.parse(parsedContent.attributes);
      const file = `tagesform_${attributes.episode}`;
      const partial = MetaSchema.parse(
        await (await fetch(`${BUCKET_URL}/X/meta/${file}.json`)).json(),
      );

      const htmlText = await markdownToHtml(parsedContent.body);
      const excerpt = await stripHtml(
        await markdownToHtml(parsedContent.body.split('<!-- more -->')[0]),
      );

      return {
        ...partial,
        title: attributes.title,
        episode: attributes.episode,
        season: 1,
        date: attributes.date.toISOString(),
        file: `${file}.mp3`,
        tags: attributes.tags,
        text: parsedContent.body,
        extra: {},
        image: `https://res.cloudinary.com/xiphe/image/upload/c_fill,g_face,h_1400,q_80,w_1400/v1460755546/${attributes.cover}.jpg`,
        excerpt,
        htmlText,
      };
    },
  });
}

export async function getEpisodeByNumber(
  number: number,
): Promise<Episode | undefined> {
  const { episodes } = await getTagesformS1Episodes();

  return episodes.find(({ episode }) => episode === number);
}

export default async function getTagesformS1Episodes() {
  return cachified({
    key: 'tagesform-s1-episodes',
    cache: redisCache,
    maxAge: 1000 * 60 * 60 * 24,
    async getFreshValue() {
      const index = await getIndex();

      const episodes = (await Promise.all(index.map(getEpisode))).sort(
        ({ episode: a }, { episode: b }) => b - a,
      );

      return {
        episodes,
        lastUpdate: await lastUpdate({
          data: episodes,
          key: 'tagesform-s1-last-update',
          cache: redisCache,
        }),
      };
    },
  });
}
