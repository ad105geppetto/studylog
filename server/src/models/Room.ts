import db from "../db/index";

export default {
  post: (title, content, tokenData, callback) => {
    if (!tokenData) {
      const queryString5 = `SELECT id from users WHERE email = "${tokenData.email}" ORDER BY createdAt DESC`;
      db.query(queryString5, (error, newResult) => {
        const queryString = `INSERT INTO rooms (title, content, roomCurrent) VALUES ("${title}", "${content}", 1)`;
        db.query(queryString, (error, result) => {
          const queryString2 = `INSERT INTO user_room (userId, roomId) VALUES (${newResult[0].id},"${result.insertId}")`;
          db.query(queryString2, (error, result) => {
            const queryString3 = `SELECT * FROM rooms ORDER BY createdAt DESC`;
            db.query(queryString3, (error, result) => {
              callback(error, result);
            });
          });
        });
      });
      return;
    } else {
      const queryString = `INSERT INTO rooms (title, content, roomCurrent) VALUES ("${title}", "${content}", 1)`;
      db.query(queryString, (error, result) => {
        const queryString2 = `INSERT INTO user_room (userId, roomId) VALUES (${tokenData.id},"${result.insertId}")`;
        db.query(queryString2, (error, result) => {
          const queryString3 = `SELECT * FROM rooms ORDER BY createdAt DESC`;
          db.query(queryString3, (error, result) => {
            callback(error, result);
          });
        });
      });
    }
  },
  patch: (userId, roomId, type, callback) => {
    if (userId) {
      if (type === "plus") {
        const queryString = `INSERT INTO user_room (userId, roomId, startTime) VALUES (${userId}, ${roomId}, NOW())`;
        db.query(queryString);
        const queryString2 = `UPDATE rooms SET roomCurrent = roomCurrent + 1 WHERE id = ${roomId}`;
        db.query(queryString2, (error, result) => {
          const queryString3 = `SELECT id FROM rooms WHERE id=${roomId}`;
          db.query(queryString3, (error, result) => {
            callback(error, result);
          });
        });
      } else if (type === "minus") {
        console.log(userId, roomId, type);
        const queryString = `UPDATE user_room SET endTime = NOW() WHERE userId = ${userId} AND roomId = ${roomId} AND endTime IS NULL`;
        db.query(queryString);

        const queryString2 = `UPDATE rooms SET roomCurrent = roomCurrent - 1 WHERE id = ${roomId}`;
        db.query(queryString2, (error, result) => {
          const queryString3 = `SELECT id FROM rooms WHERE id=${roomId}`;
          db.query(queryString3, (error, result) => {
            callback(error, result);
          });
        });
      }
    } else {
      if (type === "plus") {
        const queryString2 = `UPDATE rooms SET roomCurrent = roomCurrent + 1 WHERE id = ${roomId}`;
        db.query(queryString2, (error, result) => {
          const queryString3 = `SELECT id FROM rooms WHERE id=${roomId}`;
          db.query(queryString3, (error, result) => {
            callback(error, result);
          });
        });
      } else if (type === "minus") {
        const queryString2 = `UPDATE rooms SET roomCurrent = roomCurrent - 1 WHERE id = ${roomId}`;
        db.query(queryString2, (error, result) => {
          const queryString3 = `SELECT id FROM rooms WHERE id=${roomId}`;
          db.query(queryString3, (error, result) => {
            callback(error, result);
          });
        });
      }
    }
  },
};
