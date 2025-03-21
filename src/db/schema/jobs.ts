import {
  numeric,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { users } from './users';

export const statusEnum = pgEnum('job_status', ['active', 'inactive']);
export const contractEnum = pgEnum('job_contract', [
  'cdd',
  'cdi',
  'interim',
  'first_job',
  'internship',
  'freelance',
]);

export const jobs = pgTable('jobs', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).unique().notNull(),
  description: text('description').notNull(),
  status: statusEnum('status').default('active').notNull(),
  contract: contractEnum('contract').notNull(),
  salary: numeric('salary', { precision: 10, scale: 2 }),
  location: varchar('location', { length: 255 }).notNull(),
  createdAt: timestamp('created_at', { mode: 'date', precision: 3 })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', {
    mode: 'date',
    precision: 3,
  }).$onUpdate(() => new Date()),
  userId: uuid('user_id')
    .references(() => users.id)
    .notNull(),
});
