import path from "node:path";
import dotenv from "dotenv";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  node_env: process.env.NODE_ENV as string,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  frontend_url: process.env.FRONTEND_URL,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,

  jwt_access_secret: process.env.JWT_ACCESS_SECRET as string,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET as string,
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN as string,
  jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN as string,

  tester_student_name: process.env.TESTER_STUDENT_NAME as string,
  tester_student_email: process.env.TESTER_STUDENT_EMAIL as string,
  tester_student_password: process.env.TESTER_STUDENT_PASSWORD as string,

  tester_mentor_name: process.env.TESTER_MENTOR_NAME as string,
  tester_mentor_email: process.env.TESTER_MENTOR_EMAIL as string,
  tester_mentor_password: process.env.TESTER_MENTOR_PASSWORD as string,

  tester_admin_name: process.env.TESTER_ADMIN_NAME as string,
  tester_admin_email: process.env.TESTER_ADMIN_EMAIL as string,
  tester_admin_password: process.env.TESTER_ADMIN_PASSWORD as string,
};
