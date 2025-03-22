import { pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { jobs } from "./jobs";
import { users } from "./users";

export const statusEnum = pgEnum("application_status", [
  "pending",
  "accepted",
  "rejected",
]);

export const applications = pgTable("applications", {
  id: uuid("id").defaultRandom().primaryKey(),
  coverLetter: text("cover_letter").notNull(),
  resume: text("resume"),
  status: statusEnum("status").default("pending").notNull(),
  createdAt: timestamp("created_at", { mode: "date", precision: 3 })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", {
    mode: "date",
    precision: 3,
  }).$onUpdate(() => new Date()),
  jobId: uuid("job_id")
    .references(() => jobs.id)
    .notNull(),
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),
});
