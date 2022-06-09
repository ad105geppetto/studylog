import db from "../db/index";

export default {
  post: (title, content, tokenData, callback) => {
    const queryString = `INSERT INTO rooms (title, content, entry) VALUES ("${title}", "${content}", 1)`;
    db.query(queryString, (error, result) => {
      callback(error, result);
    });
  },
};