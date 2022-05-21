import Logo from '~/components/Logo';
import TwitchIcon from '~/components/icons/Twitch';
import YouTubeIcon from '~/components/icons/YouTube';
import InstagramIcon from '~/components/icons/Instagram';
import clsx from 'clsx';
import { ComponentPropsWithoutRef, ComponentType, ReactNode } from 'react';

const focusStyle =
  'focus-visible:outline-pink focus-visible:outline-offset-4 focus-visible:outline-4';

const liClass = clsx(
  'flex items-center m-4 px-5 py-4',
  'rounded',
  'bg-gradient-to-b from-pink-100 to-pink-300',
  'text-black focus:outline-none',
  'hover:to-pink-100',
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
    <div className="min-h-screen bg-gradient-to-b gradient-full">
      <div className="container mx-auto max-w-lg">
        <div className="flex justify-center items-center pt-5">
          <Logo className="h-20 z-10 relative mr-2" aria-hidden="true" />
          <div className="flex flex-col items-center">
            <h1 className="text-3xl font-extralight text-pink-100">
              Hannes Diem
            </h1>
            <h2 className="text-base font-extralight text-pink-300 text-opacity-60">
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
      </div>
    </div>
  );
}
