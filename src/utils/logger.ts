import { config } from "@/config";
import pino from "pino";

const { LOG_LEVEL } = config;

export const logger = pino({
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
});
