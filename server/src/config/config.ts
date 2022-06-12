import dotenv from "dotenv";
dotenv.config();

/** MySQL DB 연결 */
const config = {
  development: {
    host: "localhost",
    user: "root",
    password: process.env.DATABASE_PASSWORD,
    database: "studylog",
    multipleStatements: true,
  },
};

export default config;
