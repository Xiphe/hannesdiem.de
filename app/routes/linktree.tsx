import Logo from '~/components/Logo';
import TwitchIcon from '~/components/icons/Twitch';
import YouTubeIcon from '~/components/icons/YouTube';
import InstagramIcon from '~/components/icons/Instagram';
import clsx from 'clsx';
import { ComponentPropsWithoutRef, ComponentType, ReactNode } from 'react';

const liClass = clsx(
  'flex items-center m-4 px-5 py-4',
  'text-white bg-[rgba(2,0,36,0.5)] backdrop-blur-md',
  'rounded',
  'hover:text-[rgba(2,36,86,1)] focus:text-[rgba(2,36,86,1)] focus:outline-none',
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
    description: 'danceable emotions on demand',
    Icon: YouTubeIcon,
  },
  {
    title: 'Instagram',
    href: 'https://www.instagram.com/hannes.diem/',
    description: 'my musical world in pictures',
    Icon: InstagramIcon,
  },
];
export default function LinkTreePage() {
  return (
    <div className="container mx-auto max-w-lg">
      <div className="flex justify-center items-center pt-5">
        <Logo className="h-20 z-10 relative mr-2" aria-hidden="true" />
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-extralight text-white">Hannes Diem</h1>
          <h2 className="text-base font-extralight text-white opacity-60">
            - all the single links -
          </h2>
        </div>
      </div>
      <ul>
        {links.map(({ title, Icon, description, href }) => (
          <li key={title}>
            <a className={liClass} href={href}>
              <Icon height={40} className="mr-4" />
              <span>
                <h4 className="font-bold text-lg">{title}</h4>
                <p className="text-sm opacity-60">{description}</p>
              </span>
            </a>
          </li>
        ))}
      </ul>
      <style>
        {`
        a:hover, a:focus {
          background: linear-gradient(180deg, rgba(255,140,226,1) 0%, rgba(255,248,251,1) 100%);
        }
        body {
          min-height: 100vh;
          background: rgb(2,0,36);
          background: linear-gradient(180deg, rgba(2,0,36,1) 0%, rgba(2,36,86,1) 26%, rgba(30,35,111,1) 44%, rgba(63,26,206,1) 60%, rgba(174,30,228,1) 75%, rgba(249,52,229,1) 85%, rgba(255,140,226,1) 89%, rgba(255,248,251,1) 100%);
        }`}
      </style>
    </div>
  );
}
