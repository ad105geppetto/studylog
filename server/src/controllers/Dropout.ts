import { Request, Response } from "express";
import models from "../models/Dropout.js";
import { MysqlError } from "mysql";
import jwt from "jsonwebtoken";

export default {
  // 회원탈퇴
  // 헤더에 엑세스 토큰 들어오면
  // 해당 유저의 정보 삭제
  // accessToken null로 응답
  // 쿠키에 refreshToken 비움

  delete: (req: Request, res: Response) => {
    const authorization = req.headers["authorization"];
    const token = authorization.split(" ")[1];
    const tokenData = jwt.verify(token, process.env.ACCESS_SECRET);

    models.delete(tokenData, (error: MysqlError) => {
      if (error) {
        res.status(500).send({ message: "서버 에러" });
      } else {
        res.clearCookie("refreshToken");
        res.status(200).send({
          accessToken: null,
          message: "회원탈퇴되었습니다.",
        });
      }
    });
  },
};
