import db from "../db/index";

export default {
  post: (email: string, callback: Function) => {
    db.query(`SELECT * FROM auth ORDER BY createdAt DESC`, (error, result) => {
      if (error) {
        return callback(error);
      } else {
        const firstEmail = email === result[0].email ? result[0] : null;
        return callback(null, [firstEmail]);
      }
    });
  },
  create: (userId: string, email: string, password: string, callback: Function) => {
    db.query(
      `INSERT INTO users (userId, email, password) VALUES ("${userId}", "${email}", "${password}")`,
      (error, result) => {
        if (error) {
          return callback(error);
        } else {
          return callback(null, result);
        }
      }
    );
    db.query(`SET foreign_key_checks = 0`);
    db.query(
      `INSERT INTO logs (mon, tue, wed, thu, fri, sat, sun, totalTime) VALUES (0,0,0,0,0,0,0,0)`
    );
    db.query(`SET foreign_key_checks =1`);
  },

  // 회원가입인증메일
  save: (email: string, certNum: string, callback: Function) => {
    const queryString = `INSERT INTO auth (email, certNum) VALUES ("${email}","${certNum}")`;
    db.query(queryString, (error, result) => {
      callback(error, result);
    });
  },

  // 회원가입시 이메일인증 여부
  auth: (email: string, certNum: string, callback: Function) => {
    const queryString = `UPDATE auth SET verification = 1 WHERE email = "${email}" ORDER BY createdAt DESC LIMIT 1`;
    db.query(queryString, (error, result) => {
      callback(error, result);
    });
  },
};
