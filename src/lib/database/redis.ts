import { createClient } from 'redis';

if (!process.env.REDIS_URL) {
  throw new Error('REDIS_URL environment variable is not set');
}

const redisClient = createClient({
  url: process.env.REDIS_URL,
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));

let isConnected = false;

async function connectRedis() {
  if (!isConnected) {
    await redisClient.connect();
    isConnected = true;
  }
}

export async function getRedisClient() {
  await connectRedis();
  return redisClient;
}

export async function cacheGet<T>(key: string): Promise<T | null> {
  try {
    const client = await getRedisClient();
    const data = await client.get(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Redis get error:', error);
    return null;
  }
}

export async function cacheSet(
  key: string,
  value: any,
  expiryInSeconds: number = 3600
): Promise<void> {
  try {
    const client = await getRedisClient();
    await client.setEx(key, expiryInSeconds, JSON.stringify(value));
  } catch (error) {
    console.error('Redis set error:', error);
  }
}

export async function cacheDel(key: string): Promise<void> {
  try {
    const client = await getRedisClient();
    await client.del(key);
  } catch (error) {
    console.error('Redis delete error:', error);
  }
}

export async function cacheFlush(): Promise<void> {
  try {
    const client = await getRedisClient();
    await client.flushAll();
  } catch (error) {
    console.error('Redis flush error:', error);
  }
}
