/**
 * Copied from
 * https://github.com/kentcdodds/kentcdodds.com/blob/6f9378fec907322cffa64f609b6204cd6121e777/app/utils/redis.server.ts
 */

import type { Redis } from 'ioredis';
import RedisConstr from 'ioredis';
import { getRequiredServerEnvVar } from './misc';

declare global {
  // This prevents us from making multiple connections to the db when the
  // require cache is cleared.
  // eslint-disable-next-line
  var redis_client: Redis | undefined;
}

const REDIS_URL = getRequiredServerEnvVar('REDIS_URL');
const FLY_REGION = getRequiredServerEnvVar('FLY_REGION');

if (!global.redis_client) {
  global.redis_client = new RedisConstr(REDIS_URL);

  global.redis_client.on('error', (error: string) => {
    console.error(`REDIS (${new URL(REDIS_URL).host}) ERROR:`, error);
  });
}

const replicaClient = global.redis_client;

async function get<Value = unknown>(key: string): Promise<Value | null> {
  try {
    const v = await replicaClient.get(key);
    return v === null ? v : JSON.parse(v);
  } catch (err) {
    console.error(`REDIS replicaClient (${FLY_REGION}) ERROR with .get:`, err);
    return null;
  }
}

async function set<Value>(key: string, value: Value): Promise<'OK'> {
  try {
    await replicaClient.set(key, JSON.stringify(value));
  } catch (err) {
    console.error(`REDIS replicaClient (${FLY_REGION}) ERROR with .set:`, err);
  }
  return 'OK';
}

async function del(key: string): Promise<string> {
  try {
    // fire and forget on primary, we only care about replica
    // primaryClient?.del(key).catch((err) => {
    //   console.error('Primary delete error', err);
    // });

    const result = await replicaClient.del(key);
    return `${key} deleted: ${result}`;
  } catch (err) {
    console.error(`REDIS replicaClient (${FLY_REGION}) ERROR with .del:`, err);
    return 'error';
  }
}

const redisCache = { get, set, del, name: 'redis' };
export { get, set, del, redisCache };
