import db from "../db";

export default {
  create: (certNum: string, email: string, verification, callback: Function) => {
    // auth 테이블에 레코드 생성하는 함수
    const queryString = `INSERT INTO auth (certNum, email, verification) VALUES ("${certNum}", "${email}", ${verification})`
    db.query(queryString, (error, result) => {
      if (error) {
        return callback(error, null)
      } else {
        callback(null, result)
      }
    })
  }
}