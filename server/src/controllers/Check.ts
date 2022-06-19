import models from "../models/Check"

export default {
  post: (req, res) => {
    const { userId } = req.body
    models.post(userId, (error, result) => {
      if (error) {
        res.status(500).json({ message: "Internal Sever Error" });
      } else {
        if (result.length !== 0) {
          res.status(409).json({
            userInfo: { id: result[0].id, userId: result[0].userId },
            message: "아이디가 중복되었습니다."
          })
        } else {
          res.status(200).json({
            userInfo: null,
            message: "이 아이디를 사용하셔도 좋습니다."
          })
        }
      }
    })
  }
}