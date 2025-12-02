import { pgTable, uuid, varchar, jsonb, integer, boolean, timestamp, pgEnum } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const pricingTypeEnum = pgEnum('pricing_type', ['fixed', 'hourly', 'project', 'custom']);

export const services = pgTable('services', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: jsonb('title').$type<{ en: string; fr: string; ar: string }>().notNull(),
  slug: varchar('slug', { length: 255 }).unique().notNull(),
  description: jsonb('description').$type<{ en: string; fr: string; ar: string }>().notNull(),
  shortDescription: jsonb('short_description').$type<{ en: string; fr: string; ar: string }>(),
  icon: varchar('icon', { length: 255 }),
  features: jsonb('features').$type<Array<{ en: string; fr: string; ar: string }>>(),
  pricingType: pricingTypeEnum('pricing_type').notNull().default('custom'),
  pricingInfo: jsonb('pricing_info').$type<any>(),
  orderIndex: integer('order_index').notNull().default(0),
  isActive: boolean('is_active').notNull().default(true),
  isFeatured: boolean('is_featured').notNull().default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const insertServiceSchema = createInsertSchema(services);
export const selectServiceSchema = createSelectSchema(services);

export type Service = z.infer<typeof selectServiceSchema>;
export type NewService = z.infer<typeof insertServiceSchema>;
