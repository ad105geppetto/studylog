import { Request, Response } from "express";
import { MysqlError } from "mysql";
import { generateAccessToken, generateRefreshToken } from "./tokenFunction/Token";
import dotenv from "dotenv";
import models from "../models/Login";
dotenv.config();

type User = {
  id: number,
  userId: string
  email: string,
  profile: string
}

export default {
  post: (req: Request, res: Response) => {
    const { userId, password } = req.body;
    models.post(userId, password, (error: MysqlError, result: Array<User>) => {
      if (error) {
        return res.status(500).json({ message: "서버 에러" });
      } else {
        if (result.length === 0) {
          // DB에서 결과값이 없는 경우
          return res.status(400).send({ message: "아이디와 비밀번호를 확인해주세요." });
        } else {
          const payload = {
            id: result[0].id,
            userId: result[0].userId,
            email: result[0].email,
            profile: result[0].profile,
          };

          const accessToken = generateAccessToken(payload);
          const refreshToken = generateRefreshToken(payload);

          res
            .status(200)
            .cookie("refreshToken", refreshToken, {
              sameSite: "none",
              httpOnly: true,
              secure: true,
            })
            .json({ accessToken: accessToken, userInfo: payload, message: "성공" });
        }
      }
    });
  },
};
