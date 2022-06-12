import axios from "axios";
import googleOauth from "./tokenFunction/GoogleOauth";
import models from "../models/Oauth";
require("dotenv").config();

const clientID = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

export default {
  post: (req, res) => {
    const code = req.body.authorizationCode;
    axios
      .post(`https://oauth2.googleapis.com/token`, {
        code: code,
        client_id: clientID,
        client_secret: clientSecret,
        redirect_uri: "http://localhost:3000",
        grant_type: "authorization_code",
      })
      .then((response) => {
        const accessToken = response.data.access_token;
        googleOauth.verify(accessToken).then((data) => {
          const email = data.data.email;
          const profile = data.data.picture;
          let refreshToken = response.data.refresh_token;
          if (refreshToken === undefined) {
            // refreshToken 데이터베이스에서 가져오기
            models.get(email, profile, (error, result) => {
              if (error) {
                res.status(500).json({ message: "Internal Sever Error" });
              } else {
                console.log("최초 로그인 아님");
                res
                  .status(200)
                  .cookie("refreshToken", result[0].refreshToken, {
                    domain: "localhost",
                    path: "/",
                    sameSite: "none",
                    httpOnly: true,
                    secure: true,
                  })
                  .json({ accessToken: accessToken, message: "ok" });
              }
            });
          } else {
            // 그대로 쓰기
            models.post(email, profile, refreshToken, (error, result) => {
              if (error) {
                res.status(500).json({ message: "Internal Sever Error" });
              } else {
                res
                  .status(200)
                  .cookie("refreshToken", refreshToken, {
                    domain: "localhost",
                    path: "/",
                    sameSite: "none",
                    httpOnly: true,
                    secure: true,
                  })
                  .json({ accessToken: accessToken, message: "ok" });
              }
            });
          }
        });
      })
      .catch((e) => {
        res.status(404);
      });
    // res.send(req.body.authorizationCode);
  },
};
