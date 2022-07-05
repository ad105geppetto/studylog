import db from "../db/index";

export default {
  delete: (tokenData: any, callback: Function) => {
    // Foreign Key의 제약조건(Constraint)을 끄기
    db.query(`SET foreign_key_checks = 0`);

    const queryString = `DELETE FROM users WHERE id = ${tokenData.id}`;
    db.query(queryString, (error, result) => {
      callback(error, result);

      // Foreign Key의 제약조건(Constraint)을 켜기
      db.query(`SET foreign_key_checks = 1`);
    });
  },
};
