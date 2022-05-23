import Logo from '~/components/Logo';
import TwitchIcon from '~/components/icons/Twitch';
import YouTubeIcon from '~/components/icons/YouTube';
import TikTokIcon from '~/components/icons/TikTok';
import TwitterIcon from '~/components/icons/Twitter';
import InstagramIcon from '~/components/icons/Instagram';
import FacebookIcon from '~/components/icons/Facebook';
import portrait from '~/assets/images/portrait.png';
// import SoundCloudIcon from '~/components/icons/SoundCloud';
// import GlobeIcon from '~/components/icons/Globe';
import clsx from 'clsx';
import { ComponentPropsWithoutRef, ComponentType } from 'react';
import OptimizedImage, {
  OptimizedImageProps,
} from '~/components/OptimizedImage';
import { json, LoaderFunction } from '@remix-run/node';
import { optimizedImage } from '~/util/optimizedImage.server';
import { useLoaderData } from '@remix-run/react';

const focusStyle =
  'focus-visible:outline-pink focus-visible:outline-offset-4 focus-visible:outline-4';

const liClass = clsx(
  'rounded',
  'bg-gradient-to-b from-blue-800 to-blue-900',
  'text-white focus:outline-none',
  'hover:from-blue-900 hover:text-pink-200',
  focusStyle,
);

const links: {
  Icon: ComponentType<ComponentPropsWithoutRef<'svg'>>;
  title: string;
  description: string;
  href: string;
}[] = [
  {
    title: 'Twitch',
    href: 'https://www.twitch.tv/hannesdiem',
    description: 'join me live every Thursday at 18:00 CET',
    Icon: TwitchIcon,
  },
  {
    title: 'YouTube',
    href: 'https://www.youtube.com/channel/UCONYaNqDnjsfxIjkWgd_f8w',
    description: 'get some danceable emotions on demand',
    Icon: YouTubeIcon,
  },
  {
    title: 'Instagram',
    href: 'https://www.instagram.com/hannes.diem/',
    description: 'experience my musical world in pictures',
    Icon: InstagramIcon,
  },
  {
    title: 'TikTok',
    href: 'https://www.tiktok.com/@hannesdiem',
    description: "let's duet!",
    Icon: TikTokIcon,
  },
  {
    title: 'Twitter',
    href: 'https://twitter.com/DiemHannes',
    description: "not sure what this is for, but i'm there",
    Icon: TwitterIcon,
  },
  {
    title: 'Facebook',
    href: 'https://www.facebook.com/hannesdiem',
    description: 'come get oldschool with me',
    Icon: FacebookIcon,
  },
];

const smallIcons: {
  Icon: ComponentType<ComponentPropsWithoutRef<'svg'>>;
  title: string;
  href: string;
}[] = [
  // {
  //   title: 'SoundCloud',
  //   href: 'https://soundcloud.com/hannesdiem',
  //   Icon: SoundCloudIcon,
  // },
  // {
  //   title: 'Website',
  //   href: 'https://hanndesdiem.de',
  //   Icon: GlobeIcon,
  // },
];

interface LoaderData {
  portrait: OptimizedImageProps;
}

export const loader: LoaderFunction = async () => {
  return json<LoaderData>(
    {
      portrait: await optimizedImage(portrait),
    },
    {
      headers: {
        'Cache-Control': `public, max-age=${60 * 60 * 24}`,
      },
    },
  );
};

export default function LinkTreePage() {
  const { portrait } = useLoaderData<LoaderData>();

  return (
    <div className="min-h-screen bg-gradient-to-b gradient-full">
      <div className="container mx-auto max-w-lg">
        <div className="flex flex-col md:flex-row mx-4 pt-4 md:pt-8 md:pb-6">
          <div className="md:-ml-10 z-10 rounded-full h-20 w-20 md:h-28 md:w-28 overflow-hidden border-2 border-white shrink-0">
            <OptimizedImage {...portrait} />
          </div>
          <p className="md:-ml-16 md:pl-20 md:mt-0 -mt-4 py-4 px-4  flex flex-col justify-center bg-blue-800 rounded-md  border-2 border-blue-500">
            <span className="text-base font-bold text-pink-50">
              Yooo! so good to see you here 💙
            </span>
            <span className="text-violet-100 text-sm ">
              Please be kindly invited to connect with me and find more content
              on these platforms:
            </span>
          </p>
        </div>
        <ul>
          {links.map(({ title, Icon, description, href }) => (
            <li key={title}>
              <a
                className={clsx('flex items-center m-4 px-5 py-4', liClass)}
                href={href}
              >
                <Icon height={40} className="mr-4" aria-hidden="true" />
                <span>
                  <h4 className="font-bold text-lg">{title}</h4>
                  <p className="text-sm opacity-60">{description}</p>
                </span>
              </a>
            </li>
          ))}
        </ul>
        {smallIcons.length ? (
          <ul className="grid grid-cols-6 gap-4 mx-4">
            {smallIcons.map(({ title, Icon, href }) => (
              <li key={title}>
                <a
                  className={clsx(
                    liClass,
                    'flex aspect-square items-center justify-center',
                  )}
                  href={href}
                >
                  <Icon height={40} aria-label={title} />
                </a>
              </li>
            ))}
          </ul>
        ) : null}

        <div className="flex justify-center items-center my-5">
          <Logo className="h-20 z-10 relative mr-2" aria-hidden="true" />
          <div className="flex flex-col items-center">
            <p className="text-3xl font-extralight text-black">Hannes Diem</p>
          </div>
        </div>
      </div>
    </div>
  );
}
