import { Request, Response } from "express";
import models from "../models/Userinfo.js";
import jwt from "jsonwebtoken";

export default {
  // 회원정보불러오기
  get: (req: Request, res: Response) => {
    // 토큰있는지 확인
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

  // 회원정보수정
  // 회원정보수정하면 먼저 토큰까서
  // 그 회원의 정보에 접근해서 update하고
  // 다시 토큰발급해준다.
  patch: (req: Request, res: Response) => {
    let profilePath;
    if (req.file) {
      profilePath = req.file.path;
    }

    const { password, email } = req.body;

    if (!password && !email) {
      return res.status(400).send({ message: "이메일이나 비밀번호를 입력해주세요." });
    }

    if (!req.headers.authorization) {
      res.status(404).send({ data: null, message: "로그인을 하세요." });
    } else {
      const authorization = req.headers["authorization"];
      const token = authorization.split(" ")[1];
      const tokenData = jwt.verify(token, process.env.ACCESS_SECRET);

      // 회원정보 수정창에서 email이 token에 들어있는 이메일과 다르다면
      // 이메일 인증 눌렀는지 안 눌렀는지 체크
      if (email !== tokenData.email) {
        models.check(email, (error, result) => {
          if (error) {
            return res.status(500).send({ message: "서버에러!" });
          } else {
            // 이메일 인증 버튼을 안누른 경우
            if (result.length === 0) {
              res.status(404).send({ message: "이메일 인증버튼을 눌러주세요." });

              // 이메일 인증 버튼을 안눌렀지만 이메일에서 인증을 안한 경우
            } else if (result[0].verification === 0) {
              res.status(404).send({ message: "이메일에서 인증버튼을 눌러주세요." });

              // 이메일에서 인증을 한 경우
            } else if (result[0].verification === 1) {
              models.patch(tokenData, password, email, profilePath, (error, result) => {
                if (error) {
                  return res.status(500).send({ message: "서버에러!" });
                } else {
                  // 이메일 인증 누르고나서 회원탈퇴해버린 경우
                  if (result.length === 0) {
                    res.status(404).send({ data: null, message: "회원 정보가 존재하지않습니다." });
                  } else {
                    const payload = {
                      id: result[0].id,
                      userId: result[0].userId,
                      email: result[0].email,
                      profile: result[0].profile,
                    };

                    const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET, {
                      expiresIn: "1h",
                    });
                    const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, {
                      expiresIn: "1d",
                    });

                    //쿠키로 리프레쉬토큰 응답
                    res.cookie("refreshToken", refreshToken);

                    res.status(200).send({
                      accessToken: accessToken,
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
        });
        // 회원정보 수정창에서 email이 token에 들어있는 이메일과 같다면
        // 이메일 인증 체크 안해도 됨
      } else if (email === tokenData.email) {
        models.patch(tokenData, password, email, profilePath, (error, result) => {
          if (error) {
            return res.status(500).send({ message: "서버에러!" });
          } else {
            if (result.length === 0) {
              res.status(404).send({ data: null, message: "회원 정보가 존재하지않습니다." });
            } else {
              const payload = {
                id: result[0].id,
                userId: result[0].userId,
                email: result[0].email,
                profile: result[0].profile,
              };

              const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET, {
                expiresIn: "1h",
              });
              const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, {
                expiresIn: "1d",
              });

              //리프레쉬토큰 쿠키로
              res.cookie("refreshToken", refreshToken);

              res.status(200).send({
                accessToken: accessToken,
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
  },
};
