import db from "../db/index";

export default {
  get: (tokenData, callback) => {
    const queryString = `SELECT * from logs WHERE id = ${tokenData.id}`;
    db.query(queryString, (error, result) => {
      callback(error, result);
    });
  },

  post1: (day, time, tokenData, callback) => {
    const queryString = `UPDATE logs SET ${day} = ${day} + ${time} WHERE id = ${tokenData.id}`;
    db.query(queryString, (error, result) => {
      callback(error, result);
    });
  },

  post2: (today, NextDay, todayTime, NextDayTime, tokenData, callback) => {
    const queryString = `UPDATE logs SET ${today} = ${today} + ${todayTime}, ${NextDay} = ${NextDay} + ${NextDayTime} WHERE id = ${tokenData.id}`;
    db.query(queryString, (error, result) => {
      callback(error, result);
    });
  },
};
