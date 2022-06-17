import db from "../db";

export default {
  post: (email, profile, refreshToken, callback) => {
    const queryString = `INSERT INTO users (userId, email, profile, refreshToken) VALUES ("${email}", "${email}", "${profile}", "${refreshToken}")`
    db.query(queryString, (error, result) => {
      if (error) {
        callback(error, null)
      } else {
        callback(null, result)
      }
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
