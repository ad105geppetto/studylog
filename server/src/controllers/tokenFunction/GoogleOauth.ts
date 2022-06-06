import axios from "axios";
require("dotenv").config();

export default {
  verify: (accessToken) => {
    // 구글에서 유저정보 가져오는 Call API
    return axios
      .get(`https://www.googleapis.com/oauth2/v2/userinfo?access_token=${accessToken}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
  },
  refreshingGoogleAccessToken: (refreshToken) => {
    // access token만료시 refresh token으로 갱신하는 API
    const clientID = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

    return axios.post(`https://oauth2.googleapis.com/token`, {
      client_id: clientID,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: "refresh_token"
    })
  }
};