import { Episode } from './common';
import { getEpisodeByNumber as getS1Episode } from './s1.server';
import { getEpisodeByNumber as getS2Episode } from './s2.server';

const LAST_EPISODE_OF_S1 = 94;

export function getEpisode(number: number): Promise<Episode | undefined> {
  if (number <= LAST_EPISODE_OF_S1) {
    return getS1Episode(number);
  }

  return getS2Episode(number);
}
