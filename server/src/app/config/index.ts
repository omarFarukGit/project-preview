import path from "node:path";
import dotenv from "dotenv";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  node_env: process.env.NODE_ENV as string,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  frontend_url: process.env.FRONTEND_URL,
};
