import express from "express"
import signup from "../models/Signup";

export default {
  post: (req: express.Request, res: express.Response) => {
    signup.post((error, result) => {
      if (error) {
        return res.status(500).json({ message: "Internal Sever Error" });
      } else {
        const { userId, email, password } = req.body;
        const created = result.filter((user) => user.userId === userId);
        if (created.length === 0) {
          const createUser = `INSERT INTO users (userId, email, password) VALUES ("${userId}", "${email}", "${password}")`;
          signup.create.query(createUser);
          res.status(201).send({ message: "회원가입이 완료되었습니다." });
        } else {
          res.status(409).send({ message: "아이디, 비밀번호, 이메일을 확인해주세요." });
        }
      }
    })
  },
}