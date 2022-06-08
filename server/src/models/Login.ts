import db from "../db";

export default {
  post: (userId, password, callback) => {
    const queryString = `SELECT * FROM users WHERE userId = "${userId}" AND password = "${password}"`

    db.query(queryString, (error, result) => {
      if (error) {
        return callback(error, null)
      } else {
        callback(null, result)
      }
    })
  }
}
