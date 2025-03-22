import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";

export const keywords = pgTable("keywords", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull().unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const keywordSelectSchema = createSelectSchema(keywords);
export const keywordInsertSchema = createInsertSchema(keywords)
  .omit({
    id: true,
    createdAt: true,
  })
  .strict();
export const keywordUpdateSchema = createUpdateSchema(keywords);
