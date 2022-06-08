import db from "../db";

export default {
  get: (callback) => {
    const queryString = `SELECT * FROM rooms`
    db.query(queryString, (error, result) => {
      if (error) {
        return callback(error, null)
      } else {
        callback(null, result)
      }
    })
  }
}