import axios from "axios";
import { generateAccessToken, generateRefreshToken } from "./tokenFunction/Token";
import googleOauth from "./tokenFunction/GoogleOauth";
import models from "../models/Oauth";
require("dotenv").config();

const clientID = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
const CLIENT = process.env.CLIENT || "http://localhost:3000";
export default {
  post: (req, res) => {
    const code = req.body.authorizationCode;
    console.log(`google OAuth authorizationCode ==========`, code);
    axios
      .post(`https://oauth2.googleapis.com/token`, {
        code: code,
        client_id: clientID,
        client_secret: clientSecret,
        redirect_uri: CLIENT,
        grant_type: "authorization_code",
      })
      .then(async (response) => {
        const accessToken = response.data.access_token;
        const data = await googleOauth.verify(accessToken);
        const email = data.email;
        const profile = data.picture;
        models.post(email, profile, (error, result) => {
          if (error) {
            res.status(500).json({ message: "Internal Sever Error" });
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
                domain: "localhost",
                path: "/",
                sameSite: "none",
                httpOnly: true,
                secure: true,
              })
              .json({ accessToken: accessToken, userInfo: payload, message: "ok" });
          }
        });
      })
      .catch((e) => {
        res.status(404);
      });
  },
};
