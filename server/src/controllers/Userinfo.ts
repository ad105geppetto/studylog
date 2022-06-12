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
    let profilePath;
    if (req.file) {
      profilePath = req.file.path;
    }
    // console.log(profilePath);
    const { password, email } = req.body;
    console.log(password, email);
    // models.check(email, (error, result) => {
    //   if (error) {
    //     console.log(error);
    //   } else {
    //     if (result.length === 0) {
    //       console.log("이메일 인증 버튼을 누르세요.");
    //     } else {
    //       if (result[0].verification === 0) {
    //         console.log(result[0].verification);
    //       } else {
    //         console.log(result[0].verification);
    //       }
    //     }
    //   }
    // });
  },

  //회원정보수정
  //회원정보수정하면 먼저 토큰까서
  //그 회원의 정보에 접근해서 update하고
  //다시 토큰발급해준다.
  patch: (req: Request, res: Response, next: NextFunction) => {
    let profilePath;
    if (req.file) {
      profilePath = req.file.path;
    }
    const { password, email } = req.body;

    if (!password && !email) {
      return res.status(400).send({ message: "이메일이나 비밀번호를 입력해주세요." });
    }

    const authorization = req.headers["authorization"];
    const token = authorization.split(" ")[1];
    const tokenData = jwt.verify(token, process.env.ACCESS_SECRET);
    models.check(email, (error, result) => {
      if (error) {
        return res.status(500).send({ message: "서버에러!" });
      } else {
        if (result.length === 0) {
          res.send({ message: "이메일 인증 전송버튼을 누르세요." });
        } else {
          if (result[0].verification === 0) {
            res.status(400).send({ message: "이메일 인증을 해주세요." });
          } else {
            models.patch(tokenData, password, email, profilePath, (error, result) => {
              if (error) {
                return res.status(500).send({ message: "서버에러!" });
              } else {
                if (result.length === 0) {
                  res.status(404).send({ data: null, message: "회원 정보가 존재하지않습니다." });
                } else {
                  // console.log(result[0]);
                  const payload = {
                    id: result[0].id,
                    userId: result[0].userId,
                    email: result[0].email,
                    //ec2의 public/img에 저장되있는 파일의 주소를 넣어줌????
                    profile: result[0].profile,
                  };

                  const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET, {
                    expiresIn: "1d",
                  });
                  const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, {
                    expiresIn: "2d",
                  });

                  //리프레쉬토큰 쿠키로
                  res.cookie("refreshToken", refreshToken);

                  res.status(200).send({
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                    userInfo: {
                      id: result[0].id,
                      userId: result[0].userId,
                      email: result[0].email,
                      profile: result[0].profile,
                    },
                    message: "회원 정보가 수정되었습니다.",
                  });
                }
              }
            });
          }
        }
      }
    });
  },
};
