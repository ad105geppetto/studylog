import db from "../db/index";

export default {
  post: (userId, password, callback) => {
    // 실험용 쿼리
    // const queryString = `INSERT INTO users (userID, password, email, country) VALUES ("chc8909", "0909", "chc8909@naver.com", "강남구");`
    // const queryString = `SELECT * FROM users WHERE userId = 'chc8909' AND password = 0909`
    const queryString = `SELECT * FROM users WHERE userId = "${userId}" AND password = "${password}"`;

    db.query(queryString, (error, result) => {
      callback(error, result);
    });
  },
};
