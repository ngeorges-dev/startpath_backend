import { pgTable, uuid, varchar, timestamp, text } from "drizzle-orm/pg-core";
import { users } from "./users";

export const userLinks = pgTable("user_links", {
  id: uuid("id").defaultRandom().primaryKey(),
  url: text("url").notNull(),
  title: varchar("title", { length: 100 }).notNull(),
  createdAt: timestamp("created_at", { mode: "date", precision: 3 })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", {
    mode: "date",
    precision: 3,
  }).$onUpdate(() => new Date()),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
});
