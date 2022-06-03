import con from "../db/index";

export default {
  post: (callback: Function) => {
    con.query(`SELECT * FROM users`, (error, result) => {
      if (error) {
        return callback(error);
      } else {
        return callback(null, result);
      }
    });
  },
  check: (email, callback: Function) => {
    con.query(`SELECT * FROM auth ORDER BY createdAt DESC`, (error, result) => {
      if (error) {
        return callback(error);
      } else {
        const firstEmail = email === result[0].email ? result[0] : null
        return callback(null, [firstEmail]);
      }
    });
  },
  create: (userId, email, password, callback: Function) => {
    con.query(`INSERT INTO users (userId, email, password) VALUES ("${userId}", "${email}", "${password}")`, (error, result) => {
      if (error) {
        return callback(error);
      } else {
        return callback(null, result);
      }
    });
  },
};