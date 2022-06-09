import { Request, Response, NextFunction } from "express";
import models from "../models/Userinfo.js";
import jwt from "jsonwebtoken";

export default {
  //회원정보불러오기
  get: (req: Request, res: Response, next: NextFunction) => {
    //토큰있는지 확인
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
        // console.log(tokenData)
        res.status(200).send({
          userInfo: {
            id: tokenData.id,
            userId: tokenData.userId,
            email: tokenData.email,
            profile: tokenData.profile,
          },
          message: "유저 정보를 불러왔습니다.",
        });
      }
    }
  },

  //연습용
  post: (req: Request, res: Response, next: NextFunction) => {
    console.log(req.file);
    console.log(req.file.path);

    const { password, email } = req.body;

    console.log(password, email);
  },

  //회원정보수정
  //회원정보수정하면 먼저 토큰까서
  //그 회원의 정보에 접근해서 update하고
  //다시 토큰발급해준다.
  patch: (req: Request, res: Response, next: NextFunction) => {
    console.log(req.file);

    const profilePath = req.file.path;

    const { password, email } = req.body;
    console.log(password, email);

    //다 입력해야만 함
    //비밀번호만 쓴 경우
    // password = "0909", email:undefined
    // 아직 미완성
    if (!password && !email) {
      return res.status(400).send({ message: "이메일이나 비밀번호를 입력해주세요." });
    }

    const authorization = req.headers["authorization"];
    const token = authorization.split(" ")[1];
    const tokenData = jwt.verify(token, process.env.ACCESS_SECRET);

    models.patch(tokenData, password, email, profilePath, (error, result) => {
      if (error) {
        return res.status(500).send({ message: "서버에러!" });
      } else {
        if (result.length === 0) {
          res.status(404).send({ data: null, message: "회원 정보가 존재하지않습니다." });
        } else {
          // console.log(result);
          const payload = {
            id: tokenData.id,
            userId: tokenData.userId,
            email: email,
            //ec2의 public/img에 저장되있는 파일의 주소를 넣어줌????
            profile: profilePath,
          };

          const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET, { expiresIn: "1d" });
          const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, { expiresIn: "2d" });

          res.cookie("refreshToken", refreshToken);

          res.status(200).send({
            accessToken: accessToken,
            refreshToken: refreshToken,
            message: "회원 정보가 수정되었습니다.",
          });
        }
      }
    });
  },
};
