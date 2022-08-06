import { Request, Response } from "express";
import models from "../models/Room";
import jwt from "jsonwebtoken";

export default {
  post: async (req: Request, res: Response) => {
    const { title, content } = req.body;
    // console.log(title);

    if (!req.headers.authorization) {
      res.status(404).send({ data: null, message: "로그인을 하세요." });
    } else {
      const authorization = req.headers["authorization"];
      const token = authorization.split(" ")[1];
      const tokenData = jwt.verify(token, process.env.ACCESS_SECRET);

      //토큰해독했는데 정보가 없는 경우
      if (!tokenData) {
        res.status(400).send({ data: null, message: "회원 정보가 없습니다." });
      } else {
        models.post(title, content, tokenData, (error, result) => {
          if (error) {
            res.send({ message: "서버 에러" });
          } else {
            res.send({ id: result[0].id, message: "입장했습니다." });
          }
        });
      }
    }
  },

  patch: (req: Request, res: Response) => {
    const { userId, roomId, type } = req.body;
    models.patch(Number(userId), Number(roomId), type, (error, result) => {
      if (error) {
        console.log(error);
        res.send({ message: "서버 에러" });
      } else {
        res.send({ message: "입장했습니다." });
      }
    });
  },
};
