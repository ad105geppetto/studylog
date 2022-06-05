import axios from "axios"
require("dotenv").config();

const clientID = process.env.GITHUB_CLIENT_ID;
const clientSecret = process.env.GITHUB_CLIENT_SECRET;

export default {
  post: (req, res) => {
    const code = req.body.authorizationCode
    axios
      .post(`https://oauth2.googleapis.com/token`, {
        code: code,
        client_id: clientID,
        client_secret: clientSecret,
        redirect_uri: "http://localhost:3000",
        grant_type: "authorization_code"
      })
      .then((response) => {
        const accessToken = response.data.access_token;
        res.status(200).json({ accessToken: accessToken, response: response.data, message: "ok" });
      })
      .catch((e) => {
        res.status(404);
      })
  }
}