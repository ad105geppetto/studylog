import dotenv from "dotenv";
dotenv.config();

/** MySQL DB 연결 */
const config = {
  development: {
    host: "localhost",
    user: "root",
    password: "0909",
    database: "studylog",
    multipleStatements: true,
  },
};

export default config;
