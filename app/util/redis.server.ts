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
  var replicaClient: Redis | undefined, primaryClient: Redis | undefined;
}

const REDIS_URL = getRequiredServerEnvVar('REDIS_URL');
const replica = new URL(REDIS_URL);
const isLocalHost = replica.hostname === 'localhost';
const isInternal = replica.hostname.includes('.internal');

const isMultiRegion = !isLocalHost && isInternal;

const PRIMARY_REGION = isMultiRegion
  ? getRequiredServerEnvVar('PRIMARY_REGION')
  : null;
const FLY_REGION = isMultiRegion ? getRequiredServerEnvVar('FLY_REGION') : null;

if (FLY_REGION) {
  replica.host = `${FLY_REGION}.${replica.host}`;
}

const replicaClient = createClient('replicaClient', replica.toString());

let primaryClient: Redis | null = null;
if (FLY_REGION !== PRIMARY_REGION) {
  const primary = new URL(REDIS_URL);
  if (!isLocalHost) {
    primary.host = `${PRIMARY_REGION}.${primary.host}`;
  }
  primaryClient = createClient('primaryClient', primary.toString());
}

function createClient(
  name: 'replicaClient' | 'primaryClient',
  url: string,
): Redis {
  let client = global[name];
  if (!client) {
    client = global[name] = new RedisConstr(url);

    client.on('error', (error: string) => {
      console.error(`REDIS ${name} (${new URL(url).host}) ERROR:`, error);
    });
  }
  return client;
}

// NOTE: Caching should never crash the app, so instead of rejecting all these
// promises, we'll just resolve things with null and log the error.

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
    primaryClient?.del(key).catch((err) => {
      console.error('Primary delete error', err);
    });

    const result = await replicaClient.del(key);
    return `${key} deleted: ${result}`;
  } catch (err) {
    console.error(`REDIS replicaClient (${FLY_REGION}) ERROR with .del:`, err);
    return 'error';
  }
}

const redisCache = { get, set, del, name: 'redis' };
export { get, set, del, redisCache };
