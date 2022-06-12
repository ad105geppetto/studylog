import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import models from "../models/Login";
dotenv.config();

export default {
  post: (req: express.Request, res: express.Response) => {
    const { userId, password } = req.body;
    models.post(userId, password, (error, result) => {
      if (error) {
        return res.status(500).json({ message: "Internal Sever Error" });
      } else {
        if (result.length === 0) {
          return res.status(400).send({ message: "아이디와 비밀번호를 확인해주세요." });
        } else {
          console.log(result);
          const payload = {
            id: result[0].id,
            userId: result[0].userId,
            email: result[0].email,
          };

          const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET, { expiresIn: "1h" });
          const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, { expiresIn: "24h" });

          res
            .status(200)
            .cookie("refreshToken", refreshToken, {
              domain: "localhost",
              path: "/",
              sameSite: "none",
              httpOnly: true,
              secure: true,
            })
            .json({ accessToken: accessToken, userInfo: payload, message: "ok" });
        }
      }
    });
  },
};
