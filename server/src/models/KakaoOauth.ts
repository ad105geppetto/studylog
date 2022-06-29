import db from "../db"

export default {
  post: (email, profile, callback) => {
    const queryString = `SELECT * FROM users WHERE userId = "${email}"`;
    db.query(queryString, (error, result) => {
      if (error) {
        callback(error, null);
      } else {
        if (result.length === 0) {
          db.query(`SET foreign_key_checks = 0`);
          db.query(
            `INSERT INTO logs (mon, tue, wed, thu, fri, sat, sun, totalTime) VALUES (0,0,0,0,0,0,0,0)`
          );
          db.query(`SET foreign_key_checks =1`);

          const queryString2 = `INSERT INTO users (userId, email, profile) VALUES ("${email}", "${email}", "${profile}")`;
          db.query(queryString2, (error, result) => {
            const queryString3 = `SELECT * FROM users WHERE userId = "${email}" ORDER BY createdAt DESC`;
            db.query(queryString3, (error, result) => {
              if (error) {
                callback(error, null);
              } else {
                callback(null, result);
              }
            });
          });
        } else {
          callback(null, result);
        }
      }
    });
  },
}