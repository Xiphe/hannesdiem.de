import {
  TwitchIcon,
  YouTubeIcon,
  TikTokIcon,
  InstagramIcon,
  AppleMusicLogo,
  SpotifyLogo,
  DeezerLogo,
  AmazonMusicLogo,
  TidalLogo,
  SoundCloudLogo,
  GlobeIcon,
} from "@components";
import Image from "next/image";
import clsx from "clsx";
import { ComponentPropsWithoutRef, ComponentType, useMemo } from "react";
import { focusStyles, PageProps } from "@/utils";
import Footer from "@/components/Footer";
import FreshRelease from "@/components/content/FreshRelease";

const liStyles =
  "rounded bg-gradient-to-b from-blue-800 to-blue-900 text-white focus:outline-none hover:from-blue-900 hover:to-blue-900 hover:text-pink-200";

const liClass = clsx(liStyles, focusStyles);

const links: {
  Icon: ComponentType<ComponentPropsWithoutRef<"svg">>;
  title: string;
  description: string;
  href: string;
}[] = [
  {
    title: "Twitch",
    href: "https://www.twitch.tv/hannes_diem",
    description: "join me transforming emotions to sounds, usually Thursdays",
    Icon: TwitchIcon,
  },
  {
    title: "YouTube",
    href: "https://www.youtube.com/@hannes_diem",
    description: "get some danceable emotions on demand",
    Icon: YouTubeIcon,
  },
  {
    title: "Instagram",
    href: "https://www.instagram.com/hannes.im/",
    description: "shiny feelings for shiny people",
    Icon: InstagramIcon,
  },
  {
    title: "TikTok",
    href: "https://www.tiktok.com/@hannes.diem",
    description: "let's duet!",
    Icon: TikTokIcon,
  },
];

const smallIcons: {
  Icon: ComponentType<ComponentPropsWithoutRef<"svg">>;
  title: string;
  href: string;
}[] = [
  {
    title: "Spotify",
    href: "https://open.spotify.com/artist/2eaXfpAkFuTlmu5IsLhxMl",
    Icon: SpotifyLogo,
  },
  {
    title: "Apple Music",
    href: "https://music.apple.com/us/artist/hannes-diem/377388675",
    Icon: AppleMusicLogo,
  },
  {
    title: "Amazon Music",
    href: "https://www.amazon.com/s?k=Hannes+Diem",
    Icon: AmazonMusicLogo,
  },
  {
    title: "Deezer",
    href: "https://www.deezer.com/us/artist/533043",
    Icon: DeezerLogo,
  },
  {
    title: "Tidal",
    href: "https://tidal.com/browse/artist/3711015",
    Icon: TidalLogo,
  },
  {
    title: "SoundCloud",
    href: "https://soundcloud.com/hannesdiem",
    Icon: SoundCloudLogo,
  },
];

export default async function LinkTreePage(_: PageProps) {
  return (
    <div className="bg-gradient-to-b gradient-full">
      <div>
        <div className="min-h-screen flex flex-col justify-between">
          <div>
            <FreshRelease />
            <div className="container mx-auto max-w-lg">
              <div className="flex flex-col md:flex-row mx-4 pt-4 md:pt-8 md:pb-6">
                <div className="md:-ml-10 z-10 rounded-full h-20 w-20 md:h-28 md:w-28 overflow-hidden border-2 border-white shrink-0">
                  <Image
                    src="/image/portrait.png"
                    alt="Portrait of Hannes"
                    width={112}
                    height={112}
                  />
                </div>
                <p className="md:-ml-16 md:pl-20 md:mt-0 -mt-4 py-4 px-4  flex flex-col justify-center bg-blue-800 rounded-md  border-2 border-blue-500">
                  <span className="text-base font-bold text-pink-50">
                    Hi I&apos;m Hannes, so good to see you here 💙
                  </span>
                  <span className="text-violet-100 text-sm">
                    Please be kindly invited to connect with me and find more
                    content on these platforms:
                  </span>
                </p>
              </div>
              <ul>
                {links.map(({ title, Icon, description, href }) => (
                  <li key={title}>
                    <a
                      className={clsx(
                        "flex items-center m-4 px-5 py-4",
                        liClass
                      )}
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
              <h3 className="dark: text-white p-4 opacity-50">
                Find my music on:
              </h3>
              {smallIcons.length ? (
                <ul className="grid grid-cols-3 gap-4 mx-4">
                  {smallIcons.map(({ title, Icon, href }) => (
                    <li key={title}>
                      <a
                        className={clsx(
                          liClass,
                          "flex aspect-video items-center justify-center p-2"
                        )}
                        href={href}
                      >
                        <Icon aria-label={title} width="90%" />
                      </a>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
            <Footer />
          </div>
        </div>

        <div className="container mx-auto max-w-lg">
          <h3 className="dark: text-white p-4 opacity-50 mt-64">
            You found my other side 🌗
          </h3>
          <a
            className={clsx("flex items-center m-4 mt-0 px-5 py-4", liClass)}
            href="https://instagram.com/susy.world"
          >
            <InstagramIcon height={40} className="mr-4" aria-hidden="true" />
            <span>
              <h4 className="font-bold text-lg">susy.world</h4>
              <p className="text-sm opacity-60">vanlifing around europe</p>
            </span>
          </a>
          <a
            className={clsx("flex items-center m-4 px-5 py-4", liClass)}
            href="https://xiphe.net"
          >
            <GlobeIcon height={40} className="mr-4" aria-hidden="true" />
            <span>
              <h4 className="font-bold text-lg">Xiphe</h4>
              <p className="text-sm opacity-60">
                improving the &quot;web&quot; | &quot;team&quot; |
                &quot;process&quot; | &quot;world&quot;
              </p>
            </span>
          </a>
          <div className="w-full h-4" />
        </div>
      </div>
    </div>
  );
}
