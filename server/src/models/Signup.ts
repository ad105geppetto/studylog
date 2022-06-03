import db from "../db/index";

export default {
  post: () => {
    //회원가입
    //auth 테이블 돌면서 verification 1인경우에만 회원가입되도록 해야됨
  },

  save: (email: string, certNum: string, callback: Function) => {
    const queryString = `INSERT INTO auth (email, certNum ) VALUES ("${email}","${certNum}")`;
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
