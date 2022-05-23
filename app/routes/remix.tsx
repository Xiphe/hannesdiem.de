import { json, LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import Header from '~/components/Header';
import bg from '~/assets/images/drop_x.png';
import OptimizedImage, {
  OptimizedImageProps,
} from '~/components/OptimizedImage';
import { optimizedImage } from '~/util/optimizedImage.server';

interface LoaderData {
  bg: OptimizedImageProps;
}

export const loader: LoaderFunction = async () => {
  return json<LoaderData>({
    bg: await optimizedImage(bg),
  });
};

export default function Index() {
  const { bg } = useLoaderData<LoaderData>();
  return (
    <Header>
      <OptimizedImage {...bg} />
    </Header>
  );
}
