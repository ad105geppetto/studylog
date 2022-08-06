import db from "../db/index";
const SERVER = process.env.SERVER || "http://localhost:4000";

export default {
  // 회원정보수정
  // password,email,profileImg가 중 하나가 빈 값일 경우에 따라서 나눠줘야 됨
  patch: (tokenData, password: string, email: string, profilePath: string, callback: Function) => {
    if (profilePath) {
      // 패스워드가 없는 경우는 이메일만 업데이트
      if (!password) {
        const queryString = `UPDATE users SET email = "${email}", profile = "${SERVER}/${profilePath}" WHERE id = ${tokenData.id}`;
        db.query(queryString, (error, result) => {
          const queryString2 = `SELECT * FROM users WHERE id = ${tokenData.id}`;
          db.query(queryString2, (error, result) => {
            callback(error, result);
          });
        });
        // 이메일이 없는 경우는 패스워드만 업데이트
      } else if (!email) {
        const queryString = `UPDATE users SET password = "${password}", profile = "${SERVER}/${profilePath}" WHERE id = ${tokenData.id}`;
        db.query(queryString, (error, result) => {
          const queryString2 = `SELECT * FROM users WHERE id = ${tokenData.id}`;
          db.query(queryString2, (error, result) => {
            callback(error, result);
          });
        });
        // 다 있는 경우
      } else {
        const queryString = `UPDATE users SET email = "${email}", password = "${password}", profile = "${SERVER}/${profilePath}" WHERE id = ${tokenData.id}`;
        db.query(queryString, (error, result) => {
          const queryString2 = `SELECT * FROM users WHERE id = ${tokenData.id}`;
          db.query(queryString2, (error, result) => {
            callback(error, result);
          });
        });
      }

      // 프로필이 없는 경우
    } else {
      // 패스워드가 없는 경우는 이메일만 업데이트
      if (!password) {
        const queryString = `UPDATE users SET email = "${email}" WHERE id = ${tokenData.id}`;
        db.query(queryString, (error, result) => {
          const queryString2 = `SELECT * FROM users WHERE id = ${tokenData.id}`;
          db.query(queryString2, (error, result) => {
            callback(error, result);
          });
        });
        // 이메일이 없는 경우는 패스워드만 업데이트
      } else if (!email) {
        const queryString = `UPDATE users SET password = "${password}" WHERE id = ${tokenData.id}`;
        db.query(queryString, (error, result) => {
          const queryString2 = `SELECT * FROM users WHERE id = ${tokenData.id}`;
          db.query(queryString2, (error, result) => {
            callback(error, result);
          });
        });
        // 이메일, 패스워드 다 있는 경우
      } else {
        const queryString = `UPDATE users SET email = "${email}", password = "${password}" WHERE id = ${tokenData.id}`;
        db.query(queryString, (error, result) => {
          const queryString2 = `SELECT * FROM users WHERE id = ${tokenData.id}`;
          db.query(queryString2, (error, result) => {
            callback(error, result);
          });
        });
      }
    }
  },

  //이메일 인증 눌렀는지 안 눌렀는지 체크
  check: (email: string, callback: Function) => {
    const queryString = `SELECT verification FROM auth WHERE email = "${email}" ORDER BY createdAt DESC LIMIT 1`;
    db.query(queryString, (error, result) => {
      callback(error, result);
    });
  },
};
