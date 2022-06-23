import KakaoOauth from "../models/KakaoOauth"
import axios from "axios"

const REST_API_KEY = process.env.KAKAO_CLIENT_ID;
const REDIRECT_URI = process.env.SERVER || `http://localhost:3000/kakao/Oauth/login`

export default {
  get: (req, res) => {
    axios
      .get(
        `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`
      )
      .then((data: any) => {
        console.log(data);
        console.log(data.config.url)
        // console.log("/////");
        // window.location.assign(data);
        res.json(data.config.url)

      })
      .catch((err) => {
        console.log(err);
        res.json("errr")
      });

  }
}
