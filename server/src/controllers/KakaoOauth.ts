import KakaoOauth from "../models/KakaoOauth"
import axios from "axios"

const REST_API_KEY = process.env.KAKAO_CLIENT_ID;
const REDIRECT_URI = process.env.SERVER || `http://localhost:3000`

export default {
  get: (req, res) => {
    axios
      .get(
        `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`
      )
      .then((data: any) => {
        console.log(`data.config.url ===========`, data.config.url)
        res.json({ data: data.config.url })
      })
      .catch((err) => {
        console.log(err);
        res.json("errr")
      });
  },
  redirect: (req, res) => {
    const responsedLocation = res.req.url
    // const authorizedCode = res.req.query.code
    const authorizedCode: string = res.req.body.authorizationCode
    console.log(`authorizedCode ==========`, authorizedCode)
    axios.post(`https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.KAKAO_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&code=${authorizedCode}`)
      .then(async (data: any) => {
        console.log(data.data)
        await axios.get(`https://kapi.kakao.com/v2/user/me`, { headers: { Authorization: `Bearer ${data.data.access_token}` } })
          .then(async (userInfo: any) => {
            console.log(await userInfo.data)
            res.end()
          })
          .catch(err => {
            console.log(err)
          })
        res.json({ data: data.data })
      })
      .catch(err => {
        res.status(404);
      })
  }
}
