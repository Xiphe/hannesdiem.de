import { LoaderFunction } from 'remix';
import cover from '~/assets/tagesform/tagesform_s2_1280.jpg';
import { format } from 'date-fns';
import s1Episodes from '~/util/tagesformS1Episodes';

const TIME_FORMAT = 'iii, dd MMM yyyy HH:mm:ss OOO';

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);

  const RSS_HEAD = `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0"
        xmlns:atom="https://www.w3.org/2005/Atom"
        xmlns:content="http://purl.org/rss/1.0/modules/content/"
        xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd">
    <channel>
      <title>Tagesform</title>
      <description><![CDATA[Ein Tagebuch zum mithören - über die Musik, das Leben und den ganzen Rest]]></description>
      <atom:link href="${
        url.origin
      }/feed/tagesform/" rel="self" type="application/rss+xml" />
      <link>${url.origin}</link>
      <image>
        <title>Tagesform</title>
        <url>${url.origin}${cover}</url>
        <link>${url.origin}</link>
      </image>
      <lastBuildDate>${format(new Date(), TIME_FORMAT)}</lastBuildDate>
      <language>de</language>
      <copyright>Hannes Diercks</copyright>
      <itunes:type>episodic</itunes:type>
      <itunes:summary><![CDATA[Tagesform ist ein potentiell täglich erscheinender Podcast in dem Ich (Hannes) 3 - 15 Minuten darüber rede was mich gerade beschäftigt. Von Mentaler Gesundheit, Songwriting, Kite-Surfing, Studioequipment, dem Liebesleben und Programieren bis Wäsche aufhängen und anderen Trivialitäten.]]></itunes:summary>
      <itunes:author>Hannes Diem</itunes:author>
      <itunes:image href="${url.origin}${cover}"/>
      <itunes:category text="Music" />
      <itunes:category text="Technology" />
      <itunes:owner>
        <itunes:name>Hannes Diercks</itunes:name>
        <itunes:email>apple@xiphe.net</itunes:email>
      </itunes:owner>
      <itunes:subtitle>Ein Tagebuch zum mithören - über die Musik, das Leben und den ganzen Rest</itunes:subtitle>
      <itunes:block>no</itunes:block>
      <itunes:explicit>no</itunes:explicit>`.replace(/^    /gm, '');

  return new Response(
    [RSS_HEAD, s1Episodes.trim(), `  </channel>\n</rss>`].join('\n'),
    {
      headers: {
        'Content-Type': 'application/xml',
      },
    },
  );
};
