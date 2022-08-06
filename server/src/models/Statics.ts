import db from "../db/index";

export default {
  get: (tokenData, callback: Function) => {
    const queryString = `SELECT * from logs WHERE id = ${tokenData.id}`;
    db.query(queryString, (error, result) => {
      callback(error, result);
    });
  },

  post1: (day: string, time: number, tokenData, callback: Function) => {
    const queryString = `UPDATE logs SET ${day} = ${day} + ${time} WHERE id = ${tokenData.id}`;
    db.query(queryString, (error, result) => {
      const queryString2 = `UPDATE logs SET totalTime = totalTime + ${time} WHERE id = ${tokenData.id}`;
      db.query(queryString2, (error, result) => {
        callback(error, result);
      });
    });
  },

  post2: (today: string, NextDay: string, todayTime: number, NextDayTime: number, tokenData, callback: Function) => {
    const queryString = `UPDATE logs SET ${today} = ${today} + ${todayTime}, ${NextDay} = ${NextDay} + ${NextDayTime} WHERE id = ${tokenData.id}`;
    db.query(queryString, (error, result) => {
      const queryString2 = `UPDATE logs SET totalTime = totalTime + ${todayTime} + ${NextDayTime} WHERE id = ${tokenData.id}`;
      db.query(queryString2, (error, result) => {
        callback(error, result);
      });
    });
  },
};
