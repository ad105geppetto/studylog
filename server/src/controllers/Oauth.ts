import axios from "axios";
import googleOauth from "./tokenFunction/GoogleOauth";
import models from "../models/Oauth";
require("dotenv").config();

const clientID = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
const CLIENT = process.env.CLIENT || "http://localhost:3000";
export default {
  post: (req, res) => {
    const code = req.body.authorizationCode;
    console.log(code);
    axios
      .post(`https://oauth2.googleapis.com/token`, {
        code: code,
        client_id: clientID,
        client_secret: clientSecret,
        redirect_uri: CLIENT,
        grant_type: "authorization_code",
      })
      .then(async (response) => {
        console.log("!!!");
        const accessToken = response.data.access_token;
        const data = await googleOauth.verify(accessToken);
        const email = data.email;
        const profile = data.picture;
        let refreshToken = response.data.refresh_token;
        if (refreshToken === undefined) {
          // refreshToken 데이터베이스에서 가져오기
          models.get(email, profile, (error, result) => {
            if (error) {
              res.status(500).json({ message: "Internal Sever Error" });
            } else {
              console.log("최초 로그인 아님");
              const payload = {
                id: result[0].id,
                userId: result[0].userId,
                email: result[0].email,
                profile: result[0].profile,
              };
              res
                .status(200)
                .cookie("refreshToken", result[0].refreshToken, {
                  domain: "localhost",
                  path: "/",
                  sameSite: "none",
                  httpOnly: true,
                  secure: true,
                })
                .json({ accessToken: accessToken, userInfo: payload, message: "ok" });
            }
          });
        } else {
          // 그대로 쓰기
          models.post(email, profile, refreshToken, (error, result) => {
            if (error) {
              res.status(500).json({ message: "Internal Sever Error" });
            } else {
              console.log("최초 로그인 맞음");
              console.log(result[0]);
              const payload = {
                id: result[0].id,
                userId: result[0].userId,
                email: result[0].email,
                profile: result[0].profile,
              };
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
          });
        }
      })
      .catch((e) => {
        res.status(404);
      });
    // res.send(req.body.authorizationCode);
  },
};
