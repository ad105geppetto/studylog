import db from "../db"

export default {
  post: (email: string, profile: string, callback: Function) => {
    const queryString = `SELECT * FROM users WHERE userId = "${email}"`;
    db.query(queryString, (error, result) => {
      if (error) {
        callback(error, null);
      } else {
        if (result.length === 0) {
          // 카카오 최초 로그인시
          db.query(`SET foreign_key_checks = 0`);
          db.query(
            `INSERT INTO logs (mon, tue, wed, thu, fri, sat, sun, totalTime) VALUES (0,0,0,0,0,0,0,0)`
          );
          db.query(`SET foreign_key_checks = 1`);

          const queryString2 = `INSERT INTO users (userId, email, profile, type) VALUES ("${email}", "${email}", "${profile}", "kakao")`;
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
          if (result[0].type !== "kakao") {
            return callback(null, null);
          } else {
            callback(null, result);
          }
        }
      }
    });
  },
}