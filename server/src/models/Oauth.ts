import db from "../db";

export default {
  post: (email, profile, refreshToken, callback) => {
    db.query(`SET foreign_key_checks = 0`);
    db.query(
      `INSERT INTO logs (mon, tue, wed, thu, fri, sat, sun, totalTime) VALUES (0,0,0,0,0,0,0,0)`
    );
    db.query(`SET foreign_key_checks =1`);

    const queryString = `INSERT INTO users (userId, email, profile, refreshToken) VALUES ("${email}", "${email}", "${profile}", "${refreshToken}")`;
    db.query(queryString, (error, result) => {
      const queryString2 = `SELECT * FROM users WHERE userId = "${email}" ORDER BY createdAt DESC`;
      db.query(queryString2, (error, result) => {
        if (error) {
          callback(error, null);
        } else {
          callback(null, result);
        }
      });
    });
  },
  get: (email, profile, callback) => {
    const queryString = `SELECT * FROM users WHERE userId = "${email}" AND email = "${email}" AND profile = "${profile}"`;
    db.query(queryString, (error, result) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, result);
      }
    });
  },
};
