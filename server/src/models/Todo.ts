import db from "../db/index";

export default {
  get: (tokenData, callback: Function) => {
    const queryString = `SELECT * from todos WHERE userId = ${tokenData.id}`;
    db.query(queryString, (error, result) => {
      callback(error, result);
    });
  },

  post: (content: string, type: string, tokenData, callback: Function) => {
    const queryString = `INSERT INTO todos (userId, content , type) VALUES (${tokenData.id}, "${content}", "${type}")`;
    db.query(queryString, (error, result) => {
      const queryString2 = `SELECT * from todos WHERE userId = ${tokenData.id}`;
      db.query(queryString2, (error, result) => {
        callback(error, result);
      });
    });
  },

  patch: (todoId: number, content: string, type: string, tokenData, callback: Function) => {
    const queryString = `UPDATE todos SET content = "${content}", type = "${type}" WHERE id = ${todoId}`;
    db.query(queryString, (error, result) => {
      const queryString2 = `SELECT * from todos WHERE userId = ${tokenData.id}`;
      db.query(queryString2, (error, result) => {
        callback(error, result);
      });
    });
  },

  delete: (todoId: number, tokenData, callback: Function) => {
    const queryString = `DELETE FROM todos WHERE id = ${todoId}`;
    db.query(queryString, (error, result) => {
      const queryString2 = `SELECT * from todos WHERE userId = ${tokenData.id}`;
      db.query(queryString2, (error, result) => {
        callback(error, result);
      });
    });
  },
};
