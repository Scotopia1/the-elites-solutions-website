import { pgTable, uuid, varchar, jsonb, text, boolean, integer, timestamp } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const projects = pgTable('projects', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: jsonb('title').$type<{ en: string; fr: string; ar: string }>().notNull(),
  slug: varchar('slug', { length: 255 }).unique().notNull(),
  clientName: varchar('client_name', { length: 255 }).notNull(),
  clientLogoUrl: varchar('client_logo_url', { length: 500 }),
  challenge: jsonb('challenge').$type<{ en: string; fr: string; ar: string }>().notNull(),
  solution: jsonb('solution').$type<{ en: string; fr: string; ar: string }>().notNull(),
  results: jsonb('results').$type<{ en: string; fr: string; ar: string }>().notNull(),
  technologies: text('technologies').array().notNull().default([]),
  servicesUsed: uuid('services_used').array(),
  images: jsonb('images').$type<Array<{ url: string; alt: string }>>(),
  featuredImageUrl: varchar('featured_image_url', { length: 500 }).notNull(),
  projectUrl: varchar('project_url', { length: 500 }),
  duration: varchar('duration', { length: 100 }),
  isFeatured: boolean('is_featured').notNull().default(false),
  isPublished: boolean('is_published').notNull().default(false),
  publishedAt: timestamp('published_at'),
  orderIndex: integer('order_index').notNull().default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const insertProjectSchema = createInsertSchema(projects);
export const selectProjectSchema = createSelectSchema(projects);

export type Project = z.infer<typeof selectProjectSchema>;
export type NewProject = z.infer<typeof insertProjectSchema>;
