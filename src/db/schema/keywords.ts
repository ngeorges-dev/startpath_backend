import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const keywords = pgTable('keywords', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull().unique(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});
