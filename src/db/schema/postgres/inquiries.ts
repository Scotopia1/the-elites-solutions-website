import { pgTable, uuid, varchar, text, timestamp, pgEnum } from 'drizzle-orm/pg-core';
import { users } from './users';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const inquiryTypeEnum = pgEnum('inquiry_type', ['general', 'project', 'consultation']);
export const inquiryStatusEnum = pgEnum('inquiry_status', ['new', 'read', 'contacted', 'converted', 'closed']);

export const inquiries = pgTable('inquiries', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 50 }),
  company: varchar('company', { length: 255 }),
  message: text('message').notNull(),
  type: inquiryTypeEnum('type').notNull().default('general'),
  status: inquiryStatusEnum('status').notNull().default('new'),
  assignedTo: uuid('assigned_to').references(() => users.id),
  sourcePage: varchar('source_page', { length: 500 }).notNull(),
  locale: varchar('locale', { length: 10 }).notNull(),
  ipAddress: varchar('ip_address', { length: 50 }),
  userAgent: text('user_agent'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  respondedAt: timestamp('responded_at'),
});

export const insertInquirySchema = createInsertSchema(inquiries, {
  email: z.string().email(),
  name: z.string().min(2).max(255),
  message: z.string().min(10),
});

export const selectInquirySchema = createSelectSchema(inquiries);

export type Inquiry = z.infer<typeof selectInquirySchema>;
export type NewInquiry = z.infer<typeof insertInquirySchema>;
