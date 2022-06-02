import db from "../db";

export default {
  post: (userId, certNum, callback) => {
    const queryString = `SELECT * FROM auth WHERE certNum = "${certNum}"`
    db.query(queryString, (error, result) => {
      if (error) {
        console.log(error)
      }
      const queryString2 = `SELECT * FROM users WHERE userId = "${userId}"`
      db.query(queryString2, (error, result) => {
        if (error) {
          return callback(error, null)
        } else {
          callback(null, result)
        }
      })
    })
  }
}