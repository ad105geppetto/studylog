import db from "../db";

export default {
  post: (userId, certNum, callback) => {
    const queryString = `SELECT * FROM auth ORDER BY createdAt DESC`
    db.query(queryString, (error, result) => {
      if (error) {
        callback(error, null)
      } else {
        const firstEmail = certNum === result[0].certNum ? result[0].email : null
        const queryString2 = `SELECT * FROM users WHERE userId = "${userId}" AND email = "${firstEmail}"`
        db.query(queryString2, (error, result) => {
          if (error) {
            return callback(error, null)
          } else {
            callback(null, result)
          }
        })
      }
    })
  }
}