import fastify from "fastify";
import "dotenv/config";
import { db } from "./db";
import { keywordInsertSchema, keywords } from "./db/schema/keywords";
import cors from "@fastify/cors";

const app = fastify();

app.register(cors, {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
});

app.post("/keywords", async (request, reply) => {
  try {
    const validatedKeyword = keywordInsertSchema.parse(request.body);

    const insertedKeyword = await db
      .insert(keywords)
      .values(validatedKeyword)
      .returning();

    return reply.status(201).send(insertedKeyword);
  } catch (error) {
    console.error("Error inserting user:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return reply
      .status(500)
      .send({ error: "Internal Server Error", details: errorMessage });
  }
});

app.listen({ port: 4000, host: "0.0.0.0" }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
