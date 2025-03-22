import fastify from "fastify";
import "dotenv/config";
import cors from "@fastify/cors";
import { config } from "@/config";
import { initDB, ping } from "./db";

const { LOG_LEVEL, PORT, HOST, DATABASE_URL } = config;

export const app = fastify({
  logger: {
    level: LOG_LEVEL,
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
        ignore: "pid,hostname",
        translateTime: "SYS:yyyy-mm-dd HH:MM:ss",
        singleLine: true,
      },
    },
    redact: ["DATABASE_URL"],
  },
});

app.register(cors, {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
});

async function start() {
  const { db } = await initDB(DATABASE_URL);

  try {
    await ping(db);
    app.log.info("Database connection successful");
  } catch (error) {
    app.log.error("Database connection failed", error);
    process.exit(1);
  }

  try {
    await app.listen({ port: PORT, host: HOST });
  } catch (error) {
    app.log.error("Server startup failed", error);
    process.exit(1);
  }
}

start();
