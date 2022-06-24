import KakaoOauth from "../models/KakaoOauth"
import axios from "axios"

const REST_API_KEY = process.env.KAKAO_CLIENT_ID;
const REDIRECT_URI = process.env.SERVER || `http://localhost:4000/kakaoOauth/redirect`

export default {
  get: (req, res) => {
    axios
      .get(
        `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`
      )
      .then((data: any) => {
        // console.log(data);
        console.log(data.config.url)
        // console.log("/////");
        // window.location.assign(data);
        res.json({ data: data.config.url })

      })
      .catch((err) => {
        console.log(err);
        res.json("errr")
      });
  },
  redirect: (req, res) => {
    console.log(res.req.url)
    const responsedLocation = res.req.url
    console.log(responsedLocation)
    const authorizedCode = res.req.query.code
    console.log(typeof authorizedCode)
    console.log(authorizedCode)
    axios.post(`https://kauth.kakao.com/oauth/token${responsedLocation}`, {
      grant_type: "authorization_code",
      client_id: REST_API_KEY,
      redirect_uri: `http://localhost:4000/kakaoOauth/redirect`,
      code: authorizedCode,
      client_secret: process.env.KAKAO_CLIENT_SECRET
    }, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
      .then(data => {
        console.log(data)
        res.send("OK~!!")
      })
      .catch(err => {
        console.log(err)
        res.send("err")
      })
  }
}
