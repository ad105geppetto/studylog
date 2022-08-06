import { Request, Response } from "express";
import axios from "axios";
import { generateAccessToken, generateRefreshToken } from "./tokenFunction/Token";
import googleOauth from "./tokenFunction/GoogleOauth";
import models from "../models/Oauth";
require("dotenv").config();

const clientID = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
const CLIENT = process.env.CLIENT || "http://localhost:3000/login";

export default {
  post: (req: Request, res: Response) => {
    const authorizationCode: string = req.body.authorizationCode;

    axios
      .post(`https://oauth2.googleapis.com/token`, {
        code: authorizationCode,
        client_id: clientID,
        client_secret: clientSecret,
        redirect_uri: CLIENT,
        grant_type: "authorization_code",
      })
      .then(async (response) => {
        const googleAccessToken: string = response.data.access_token;
        const userData = await googleOauth.verify(googleAccessToken);
        const email = userData.email;
        const profile = userData.picture;
        models.post(email, profile, (error, result) => {
          if (error) {
            res.status(500).json({ message: "서버 에러" });
          } else {
            if (result === "No google user") {
              res.json({ message: "이미 카카오 계정으로 가입한 유저입니다." });
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
      })
      .catch((e) => {
        res.status(404);
      });
  },
};
