import { Request, Response } from "express";
import { MysqlError } from "mysql";
import models from "../models/KakaoOauth";
import { generateAccessToken, generateRefreshToken } from "./tokenFunction/Token";
import axios from "axios";

const REST_API_KEY = process.env.KAKAO_CLIENT_ID;
const REDIRECT_URI = process.env.CLIENT || `http://localhost:3000/login`;

type User = {
  id: number,
  userId: string
  email: string,
  profile: string
}

export default {
  get: (req: Request, res: Response) => {
    axios
      .get(
        `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`
      )
      .then((data) => {
        res.json({ data: data.config.url, message: "성공" });
      })
      .catch((err) => {
        res.status(400).json({ message: "URL 요청 실패" });
      });
  },
  redirect: (req: Request, res: Response) => {
    const authorizedCode: string = res.req.body.authorizationCode;
    axios
      .post(
        `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.KAKAO_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&code=${authorizedCode}&client_secret=${process.env.KAKAO_CLIENT_SECRET}`
      )
      .then(async (data) => {
        const kakaoAccessToken = data.data.access_token;

        await axios
          .get(`https://kapi.kakao.com/v2/user/me`, {
            headers: { Authorization: `Bearer ${kakaoAccessToken}` },
          })
          .then(async (userInfo) => {
            const email: string = userInfo.data.kakao_account.email;
            const profile: string = userInfo.data.kakao_account.profile.thumbnail_image_url;
            models.post(email, profile, (error: MysqlError, result: Array<User>) => {
              if (error) {
                res.status(500).json({ message: "Internal Sever Error" });
              } else {
                if (result === null) {
                  res.json({ message: "이미 구글 계정으로 가입한 유저입니다." });
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
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        res.status(404);
      });
  },
};
