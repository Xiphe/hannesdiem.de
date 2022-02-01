import { Cache, cachified } from './cache.server';
import { createHash } from 'crypto';

export async function lastUpdate({
  data,
  key,
  cache,
}: {
  key: string;
  cache: Cache<any>;
  data: any;
}) {
  const hash = createHash('sha256')
    .update(JSON.stringify(data) + Math.random())
    .digest('hex');

  return (
    await cachified({
      key,
      cache,
      checkValue([_, h]: [number, string]) {
        return hash === h ? true : 'content updated';
      },
      async getFreshValue(): Promise<[number, string]> {
        return [Date.now(), hash];
      },
    })
  )[0];
}
