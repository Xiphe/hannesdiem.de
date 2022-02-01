import formatTagesformFeedDate from './formatDate';
import { BUCKET_URL, Episode } from './common';
import escapeHtml from 'escape-html';

export function episodeToRssItem({
  title,
  episode,
  season,
  date,
  extra,
  excerpt,
  htmlText,
  file,
  length,
  duration,
  image,
}: Episode) {
  return `
    <item>
      <title>${title}</title>
      <itunes:episode>${episode}</itunes:episode>
      <itunes:season>${season}</itunes:season>
      <enclosure url="${BUCKET_URL}/${file}" length="${length}" type="audio/mpeg" />
      <itunes:duration>${duration}</itunes:duration>
      <itunes:episodeType>full</itunes:episodeType>
      <itunes:author>Hannes Diem</itunes:author>
      <atom:contributor>
        <atom:name>Hannes Diem</atom:name>
        <atom:uri>https://hannesdiem.de/</atom:uri>
      </atom:contributor>
      <link>https://hannesdiem.de/tagesform-${episode}/</link>
      <guid>https://hannesdiem.de/tagesform-${episode}</guid>
      <pubDate>${formatTagesformFeedDate(new Date(date))}</pubDate>
      <itunes:explicit>${
        extra.explicit === true ? 'Yes' : 'No'
      }</itunes:explicit>
      <description>${escapeHtml(excerpt)}</description>
      <itunes:subtitle>${escapeHtml(excerpt)}</itunes:subtitle>
      <content:encoded><![CDATA[${htmlText}]]></content:encoded>
      <itunes:summary><![CDATA[${htmlText}]]></itunes:summary>
      <itunes:image href="${BUCKET_URL}/${image}" />
    </item>
  `.trim();
}
