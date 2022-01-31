import { json, LoaderFunction, useLoaderData } from 'remix';
import Logo, { SCHEMA_RETRO } from '~/components/Logo';
import { OptimizedImage } from '~/components/OptimizedImage';
import bg from '~/assets/images/drop_x.png';

export const loader: LoaderFunction = async () => {
  return json(null);
};

export default function Index() {
  return (
    <div className="shadow-md h-20">
      <div className="container mx-auto flex items-center">
        <div className="h-20">
          <Logo className="h-40 z-10 relative" />
        </div>
        <p className="text-3xl font-extralight">Hannes Diem</p>
      </div>
      <OptimizedImage
        src={bg}
        responsive={[
          { size: { width: 250, height: 208 } },
          { size: { width: 512, height: 426 } },
          { size: { width: 768, height: 639 } },
          { size: { width: 1024, height: 852 } },
          { size: { width: 1500, height: 1248 } },
          { size: { width: 2000, height: 1664 } },
          { size: { width: 2500, height: 2081 } },
          { size: { width: 3000, height: 2497 } },
          { size: { width: 3563, height: 2966 } },
        ]}
      />
    </div>
  );
}
