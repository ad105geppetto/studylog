import axios from "axios"
require("dotenv").config();

const clientID = process.env.GITHUB_CLIENT_ID;
const clientSecret = process.env.GITHUB_CLIENT_SECRET;

export default {
  post: (req, res) => {
    axios({
      method: "post",
      url: `https://oauth2.googleapis.com/token`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      withCredentials: true,
      data: {
        code: req.body.authorizationCode,
        client_id: clientID,
        client_secret: clientSecret,
        redirect_uri: "http//localhost:3000",
        grant_type: "authorization_code"
      },
    })
      .then((response) => {
        console.log(response.data);
        const accessToken = response.data.access_token;
        res.status(200).json({ accessToken: accessToken, response: response.data, message: "ok" });
      })
      .catch((e) => {
        res.status(404);
      })
  }
}