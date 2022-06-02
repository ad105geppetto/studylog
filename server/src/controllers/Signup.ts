import express from "express"
import signup from "../models/Signup";

export default {
  post: (req: express.Request, res: express.Response) => {
    signup.post((error, result) => {
      if (error) {
        res.status(500).json({ message: "Internal Sever Error" });
      } else {
        const { userId, email, password } = req.body;
        signup.check(email, (error, result) => {
          if (error) {
            res.status(500).json({ message: "Internal Sever Error" });
          } else {
            if (result.length === 0) {
              res.status(400).json({ message: "이메일 인증을 다시 해주세요." });
            } else {
              if (result[0].verification === 0) {
                res.status(400).json({ message: "보내신 이메일에서 인증 버튼을 클릭 해주세요." });
              } else {
                const created = result.filter((user) => user.userId === userId);
                if (created.length === 0) {
                  signup.create(userId, email, password, (error, result) => {
                    if (error) {
                      res.status(500).json({ message: "Internal Sever Error" });
                    } else {
                      res.status(201).send({ message: "회원가입이 완료되었습니다." });
                    }
                  });
                } else {
                  res.status(409).send({ message: "아이디, 비밀번호, 이메일을 확인해주세요." });
                }
              }
            }
          }
        })
      }
    })
  },
}