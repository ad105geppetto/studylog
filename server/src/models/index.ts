import * as fs from "fs";
import db from "../db/index";

const schema = fs.readFileSync("./studylog.sql").toString();
const seed = fs.readFileSync("./seed.sql").toString();

db.query(`DROP DATABASE IF EXISTS ${process.env.DATABASE_NAME}`);
db.query(`CREATE DATABASE ${process.env.DATABASE_NAME}`);
db.query(`USE ${process.env.DATABASE_NAME}`);
db.query(schema, (error, result) => {
  if (error) {
    return console.log(error);
  } else {
    return console.log("ok");
  }
});
db.query(seed, (error, result) => {
  if (error) {
    return console.log(error);
  } else {
    return console.log(null, result);
  }
});
db.end();
