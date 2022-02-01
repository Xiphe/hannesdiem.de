import { LoaderFunction } from 'remix';
import cover from '~/assets/images/tagesform_s2_2000.jpg';
import formatTagesformFeedDate from '~/util/tagesform/formatDate';
import getS2Episodes from '~/util/tagesform/s2.server';
import getS1Episodes from '~/util/tagesform/s1.server';
import { episodeToRssItem } from '~/util/tagesform/episodeToRssItem';

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const origin =
    url.hostname === 'localhost' ? url.origin : `https://${url.host}`;

  const [
    { lastUpdate: s2LastUpdate, episodes: s2Episodes },
    { lastUpdate: s1LastUpdate, episodes: s1Episodes },
  ] = await Promise.all([getS2Episodes(), getS1Episodes()]);

  const RSS_HEAD = `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0"
        xmlns:atom="https://www.w3.org/2005/Atom"
        xmlns:content="http://purl.org/rss/1.0/modules/content/"
        xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd">
    <channel>
      <title>Tagesform</title>
      <description><![CDATA[Ein Tagebuch zum mithören - über die Musik, das Leben und den ganzen Rest]]></description>
      <atom:link href="${origin}/feed/tagesform/" rel="self" type="application/rss+xml" />
      <link>${origin}</link>
      <image>
        <title>Tagesform</title>
        <url>${origin}${cover}</url>
        <link>${origin}</link>
      </image>
      <lastBuildDate>${formatTagesformFeedDate(
        Math.max(s2LastUpdate, s1LastUpdate),
      )}</lastBuildDate>
      <language>de</language>
      <copyright>Hannes Diercks</copyright>
      <itunes:type>episodic</itunes:type>
      <itunes:summary><![CDATA[Tagesform ist ein potentiell täglich erscheinender Podcast in dem Ich (Hannes) 3 - 15 Minuten darüber rede was mich gerade beschäftigt. Von Mentaler Gesundheit, Songwriting, Kite-Surfing, Studioequipment, dem Liebesleben und Programieren bis Wäsche aufhängen und anderen Trivialitäten.]]></itunes:summary>
      <itunes:author>Hannes Diem</itunes:author>
      <itunes:image href="${origin}${cover}"/>
      <itunes:category text="Music">
        <itunes:category text="Music Commentary" />
      </itunes:category>
      <itunes:category text="Technology" />
      <itunes:category text="Health &amp; Fitness">
        <itunes:category text="Mental Health" />
      </itunes:category>
      <itunes:owner>
        <itunes:name>Hannes Diercks</itunes:name>
        <itunes:email>apple@xiphe.net</itunes:email>
      </itunes:owner>
      <itunes:subtitle>Ein Tagebuch zum mithören - über die Musik, das Leben und den ganzen Rest</itunes:subtitle>
      <itunes:block>no</itunes:block>
      <itunes:explicit>no</itunes:explicit>
      <fyyd:verify xmlns:fyyd="https://fyyd.de/fyyd-ns/">vw374msen1xi5wuop5l85wofIdpfv6ciaLu2718s</fyyd:verify>
      <atom:link rel="me" href="https://podcasts.apple.com/podcast/id1109789077"/>
      `.replace(/^    /gm, '');

  return new Response(
    [
      RSS_HEAD,
      s2Episodes.map(episodeToRssItem),
      s1Episodes.map(episodeToRssItem),
      `  </channel>\n</rss>`,
    ].join('\n'),
    {
      headers: {
        'Content-Type': 'application/xml',
      },
    },
  );
};
