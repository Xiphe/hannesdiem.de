import { json, LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import Header from '~/components/Header';
import OptimizedImage, {
  OptimizedImageProps,
} from '~/components/OptimizedImage';
import { optimizedImage } from '~/util/optimizedImage.server';
import { getEpisode } from '~/util/tagesform/getEpisode.server';

interface LoaderData {
  title: string;
  episode: number;
  bg: OptimizedImageProps;
  cover: OptimizedImageProps;
  text: string;
}

export const loader: LoaderFunction = async ({ params }) => {
  const episodeNumber = parseInt(params.i || '-1', 10);

  if (String(episodeNumber) !== params.i) {
    throw new Response('Not Found', { status: 404 });
  }

  const episode = await getEpisode(episodeNumber);

  if (!episode) {
    throw new Response('Not Found', { status: 404 });
  }

  return json<LoaderData>({
    title: episode.title,
    episode: episode.episode,
    cover: await optimizedImage(episode.image),
    bg: await optimizedImage(episode.image, {
      blur: 30,
      resize: { ratio: 16 / 9 },
    }),
    text: episode.htmlText,
  });
};

export default function TagesformEpisode() {
  const { title, episode, bg, cover } = useLoaderData<LoaderData>();

  return (
    <>
      <Header>{bg && <OptimizedImage {...bg} maxWidth={false} />}</Header>
      <div className="container mx-auto mt-20">
        <OptimizedImage {...cover} maxWidth={300} />
        <h1 className="px-20 py-4 text-center text-5xl font-bold">
          Tagesform {episode} - {title}
        </h1>
      </div>
    </>
  );
}
