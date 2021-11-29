import { config } from "dotenv";
import * as path from "path";

config({ path: path.resolve(__dirname, "../.env") });

export default {
  secretKey: process.env.secretKey || "secret",
  refreshExpire: process.env.refreshExpire || 3600 * 12 * 7,
  accessExpire: process.env.accessExpire || 3600 * 12,
  host: process.env.host || "root",
  user: process.env.user || "root",
  password: process.env.password || "ha-ha",
  database: process.env.database || "fin-planner",
  port: 5432,
  jwtSecret: process.env.jwtSecret,
  googleId: process.env.googleId,
  redisHost: process.env.redisHost,
  redisPassword: process.env.redisPass,
  redisPort: process.env.redisPort,
  currencyApi: process.env.currencyApi,
};