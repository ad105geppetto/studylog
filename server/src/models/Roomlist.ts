import db from "../db/index"

export default {
  get: (callback: Function) => {
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