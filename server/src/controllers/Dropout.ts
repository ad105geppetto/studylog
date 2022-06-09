import { Request, Response, NextFunction } from "express";
import models from "../models/Dropout.js";
import jwt from "jsonwebtoken";

export default {
  // 회원탈퇴
  // 헤더에 엑세스 토큰 들어오면
  // 해당 유저의 정보 삭제

  delete: (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.headers["authorization"];
    const token = authorization.split(" ")[1];
    const tokenData = jwt.verify(token, process.env.ACCESS_SECRET);

    models.delete(tokenData, (error, result) => {
      if (error) {
        res.status(500).send({ message: "서버에러" });
      } else {
        res.clearCookie("refreshToken");
        res.status(200).send({
          accessToken: null,
          refreshToken: null,
          message: "회원탈퇴되었습니다.",
        });
      }
    });
  },
};
