import * as fs from "fs";
import db from "../db/index";

const schema = fs.readFileSync("./studylog.sql").toString();
const seed = fs.readFileSync("./seed.sql").toString();

db.query(`DROP DATABASE IF EXISTS studylog`);
db.query(`CREATE DATABASE studylog`);
db.query(`USE studylog`);
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
    return console.log("ok");
  }
});
db.end();
