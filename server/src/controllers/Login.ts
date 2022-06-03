import { Request, Response, NextFunction } from "express";

import models from "../models/Login";
import jwt from "jsonwebtoken";

export default {
  post: (req, res) => {
    const { userId, password } = req.body;

    models.post(userId, password, (error, result) => {
      if (error) {
        return res.status(500).send({ data: null, message: "서버에러" });
      } else {
        if (result.length === 0) {
          return res
            .status(400)
            .send({ data: null, message: "아이디 혹은 비밀번호가 일치하지 않습니다." });
        } else {
          // db돌고나온값
          // result[0]
          // console.log(result)

          const payload = {
            id: result[0].id,
            userId: result[0].userId,
            email: result[0].email,
            profile: result[0].profile,
          };

          const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET, { expiresIn: "1d" });
          res
            .status(201)
            .send({ data: { accessToken: accessToken }, message: "로그인 성공했습니다" });
        }
      }
    });
  },
};
