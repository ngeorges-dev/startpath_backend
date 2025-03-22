import { pgTable, uuid, primaryKey } from "drizzle-orm/pg-core";
import { keywords } from "./keywords";
import { jobs } from "./jobs";

export const jobsKeywords = pgTable(
  "job_keywords",
  {
    jobId: uuid("job_id")
      .references(() => jobs.id)
      .notNull(),
    keywordId: uuid("keyword_id")
      .references(() => keywords.id)
      .notNull(),
  },
  (table) => [primaryKey({ columns: [table.jobId, table.keywordId] })],
);
