import db from "../db/index";

export default {
  delete: (tokenData: any, callback: Function) => {
    db.query(`SET foreign_key_checks = 0`);

    const queryString = `DELETE FROM users WHERE id = ${tokenData.id}`;
    db.query(queryString, (error, result) => {
      callback(error, result);

      db.query(`SET foreign_key_checks = 1`);
    });
  },
};
