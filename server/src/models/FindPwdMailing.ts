import db from "../db";

export default {
  create: (certNum, email, verification, callback) => {
    const queryString = `INSERT INTO auth (certNum, email, verification) VALUES ("${certNum}", "${email}", ${verification})`
    db.query(queryString, (error, result) => {
      if (error) {
        return callback(error, null)
      } else {
        callback(null, result)
      }
    })
  },
  check: (email, callback) => {
    const queryString = `SELECT * FROM auth WHERE email = "${email}" ORDER BY createdAt`
    db.query(queryString, (error, result) => {
      if (error) {
        return callback(error, null)
      } else {
        callback(null, result)
      }
    })
  }
}