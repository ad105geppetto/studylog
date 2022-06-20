import dotenv from "dotenv";
dotenv.config();

/** MySQL DB 연결 */
const config = {
  development: {
    host: process.env.DATABASE_HOST || "localhost",
    user: process.env.DATABASE_USER || "root",
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME || "studylog",
    multipleStatements: true,
    port: process.env.DATABASE_PORT || "3306"
  },
};

export default config;
