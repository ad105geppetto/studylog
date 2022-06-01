import con from "../db/index";

export default {
  post: (callback: Function) => {
    con.query(`SELECT * FROM users`, (err, result) => {
      if (err) {
        return callback(err);
      } else {
        return callback(null, result);
      }
    });
  },
  create: con,
};