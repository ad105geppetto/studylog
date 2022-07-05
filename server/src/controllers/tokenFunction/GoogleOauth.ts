import axios, { AxiosError, AxiosResponse } from "axios";
require("dotenv").config();

export default {
  verify: async (accessToken: string) => {
    // 구글에서 유저정보 가져오는 Call API
    let userData = await axios.get(`https://www.googleapis.com/oauth2/v2/userinfo?access_token=${accessToken}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res: AxiosResponse) => {
        return res.data
      })
      .catch((error: AxiosError) => {
        return error
      })
    return userData
  }
};
