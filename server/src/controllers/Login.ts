import { Request, Response } from "express";
import { generateAccessToken, generateRefreshToken } from "./tokenFunction/Token";
import dotenv from "dotenv";
import models from "../models/Login";
dotenv.config();

export default {
  post: (req: Request, res: Response) => {
    const { userId, password } = req.body;
    models.post(userId, password, (error, result) => {
      if (error) {
        return res.status(500).json({ message: "Internal Sever Error" });
      } else {
        if (result.length === 0) {
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
            .json({ accessToken: accessToken, userInfo: payload, message: "ok" });
        }
      }
    });
  },
};
