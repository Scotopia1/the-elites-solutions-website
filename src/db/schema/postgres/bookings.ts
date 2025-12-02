import { pgTable, uuid, varchar, text, date, time, timestamp, pgEnum } from 'drizzle-orm/pg-core';
import { users } from './users';
import { services } from './services';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const bookingStatusEnum = pgEnum('booking_status', ['pending', 'confirmed', 'completed', 'cancelled', 'no_show']);

export const bookings = pgTable('bookings', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 50 }).notNull(),
  company: varchar('company', { length: 255 }),
  preferredDate: date('preferred_date').notNull(),
  preferredTime: time('preferred_time').notNull(),
  timezone: varchar('timezone', { length: 100 }).notNull(),
  serviceInterested: uuid('service_interested').references(() => services.id),
  message: text('message'),
  status: bookingStatusEnum('status').notNull().default('pending'),
  meetingLink: varchar('meeting_link', { length: 500 }),
  calendarEventId: varchar('calendar_event_id', { length: 255 }),
  assignedTo: uuid('assigned_to').references(() => users.id),
  locale: varchar('locale', { length: 10 }).notNull(),
  ipAddress: varchar('ip_address', { length: 50 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  confirmedAt: timestamp('confirmed_at'),
  completedAt: timestamp('completed_at'),
});

export const insertBookingSchema = createInsertSchema(bookings, {
  email: z.string().email(),
  name: z.string().min(2).max(255),
  phone: z.string().min(10),
});

export const selectBookingSchema = createSelectSchema(bookings);

export type Booking = z.infer<typeof selectBookingSchema>;
export type NewBooking = z.infer<typeof insertBookingSchema>;
