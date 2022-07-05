import db from "../db/index";

export default {
  get: (callback: Function) => {
    const queryString = `SELECT * FROM rooms ORDER BY createdAt DESC`
    db.query(queryString, (error, result) => {
      if (error) {
        return callback(error, null)
      } else {
        callback(null, result)
      }
    })
  },
  delete: (roomId: number, callback: Function) => {
    const queryString = `DELETE FROM rooms WHERE id = ${roomId}`
    db.query(queryString, (error, result) => {
      if (error) {
        return callback(error, null);
      } else {
        callback(null, result);
      }
    });
  },
};
