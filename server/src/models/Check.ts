import db from "../db";

export default {
  post: (userId: string, callback: Function) => {
    const queryString = `SELECT * FROM users WHERE userId = "${userId}"`
    db.query(queryString, (error, result: []) => {
      if (error) {
        return callback(error, null)
      } else {
        callback(null, result)
      }
    })
  }
}