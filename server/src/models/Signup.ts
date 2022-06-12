import db from "../db/index";

export default {
  post: (callback: Function) => {
    db.query(`SELECT * FROM users`, (error, result) => {
      if (error) {
        return callback(error);
      } else {
        return callback(null, result);
      }
    });
  },
  check: (email, callback: Function) => {
    db.query(`SELECT * FROM auth ORDER BY createdAt DESC`, (error, result) => {
      if (error) {
        return callback(error);
      } else {
        const firstEmail = email === result[0].email ? result[0] : null;
        return callback(null, [firstEmail]);
      }
    });
  },
  create: (userId, email, password, callback: Function) => {
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
  },
  //회원가입인증메일
  save: (email: string, certNum: string, callback: Function) => {
    const queryString = `INSERT INTO auth (email, certNum) VALUES ("${email}","${certNum}")`;
    db.query(queryString, (error, result) => {
      callback(error, result);
    });
  },

  auth: (email: string, certNum: string, callback: Function) => {
    const queryString = `SELECT * FROM auth WHERE email="${email}" AND certNum = "${certNum}"`;
    db.query(queryString, (error, result) => {
      const queryString2 = `UPDATE auth SET verification = 1 WHERE certNum = "${certNum}" ORDER BY createdAt DESC LIMIT 1`;
      if (error) {
      } else {
        db.query(queryString2, (error, result) => {
          callback(error, result);
        });
      }
    });
  },
};
