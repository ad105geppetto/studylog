import models from "../models/Userpwd"

export default {
  post: (req, res) => {
    const { userId, certNum } = req.body
    models.post(userId, certNum, (error, result) => {
      if (error) {
        res.status(500).json({ message: "Internal Sever Error" });
      } else {
        if (result.length === 0) {
          res.status(400).json({
            message: "userId나 인증번호를 입력해주세요."
          })
        } else {
          res.status(200).json({
            userId: result[0].userId,
            password: result[0].password
          })
        }
      }
    })
  }
}