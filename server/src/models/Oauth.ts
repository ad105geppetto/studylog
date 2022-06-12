import db from "../db";

export default {
  post: (email, profile, refreshToken, callback) => {
    const queryString1 = `INSERT INTO users (userId, email, profile) VALUES ("${email}", "${email}", "${profile}")`
    db.query(queryString1, (error, result) => {
      const queryString2 = `INSERT INTO token (refreshToken) VALUES ("${refreshToken}")`
      db.query(queryString2, (error, result) => {
        if (error) {
          callback(error, null)
        } else {
          callback(null, result)
        }
      })
    })
  },
  get: (email, profile, callback) => {
    const queryString = `SELECT * FROM users JOIN token WHERE userId = "${email}" AND email = "${email}" AND profile = "${profile}"`
    db.query(queryString, (error, result) => {
      if (error) {
        callback(error, null)
      } else {
        callback(null, result)
      }
    })
  },
}
