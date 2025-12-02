import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '@/db/schema/postgres';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set');
}

const queryClient = postgres(process.env.DATABASE_URL, {
  max: 20,
  idle_timeout: 20,
  connect_timeout: 10,
});

export const db = drizzle(queryClient, {
  schema,
  logger: process.env.NODE_ENV === 'development',
});

export type Database = typeof db;
