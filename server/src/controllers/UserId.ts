import { Request, Response } from "express";
import models from "../models/UserId"

export default {
  post: (req: Request, res: Response) => {
    const { email } = req.body
    models.post(email, (error, result) => {
      if (error) {
        res.status(500).json({ message: "서버 에러" });
      } else {
        if (result.length === 0) {
          res.status(404).json({
            userId: null,
            message: "일치하는 email주소가 없습니다."
          })
        } else {
          res.status(200).json({
            userId: result[0].userId,
            message: "성공"
          })
        }
      }
    })
  }
}