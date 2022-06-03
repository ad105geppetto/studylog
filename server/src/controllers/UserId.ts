import models from "../models/UserId"

export default {
  post: (req, res) => {
    const { email } = req.body
    models.post(email, (error, result) => {
      if (error) {
        res.status(500).json({ message: "Internal Sever Error" });
      } else {
        if (result.length === 0) {
          res.status(404).json({
            userId: null,
            message: "일치하는 email주소가 없습니다."
          })
        } else {
          res.status(200).json({
            userId: result[0].userId
          })
        }
      }
    })
  }
}