import { Request, Response } from "express";
import models from "../models/Signup";
import nodemailer from "nodemailer";

export default {
  post: (req: Request, res: Response) => {
    models.post((error, result) => {
      if (error) {
        res.status(500).json({ message: "Internal Sever Error" });
      } else {
        const { userId, email, password } = req.body;
        models.check(email, (error, result) => {
          if (error) {
            res.status(500).json({ message: "Internal Sever Error" });
          } else {
            console.log(result);
            if (result.length === 0) {
              res.status(400).json({ message: "이메일 인증을 다시 해주세요." });
            } else {
              if (result[0].verification === 0) {
                res.status(400).json({ message: "보내신 이메일에서 인증 버튼을 클릭 해주세요." });
              } else {
                const created = result.filter((user) => user.userId === userId);
                if (created.length === 0) {
                  models.create(userId, email, password, (error, result) => {
                    if (error) {
                      res.status(500).json({ message: "Internal Sever Error" });
                    } else {
                      res.status(201).send({ message: "회원가입이 완료되었습니다." });
                    }
                  });
                } else {
                  res.status(409).send({ message: "아이디, 비밀번호, 이메일을 확인해주세요." });
                }
              }
            }
          }
        });
      }
    });
  },
  mail: (req: Request, res: Response) => {
    //받아온 이메일
    let { email } = req.body;

    const vaildCheck = email.indexOf("@");
    if (!email || email.length === 0 || vaildCheck === -1) {
      res.status(400).json({ message: "올바른 메일을 입력해주세요." });
    }

    /////////////////
    // 1. 인증번호 생성(인증코드)
    const certNum = Math.random().toString().substring(2, 6);
    // 2. ttl설정

    // 3. 인증 코드 테이블에 데이터 입력
    models.save(email, certNum, (error, result) => {
      if (error) {
        res.status(500).send({ message: "서버에러!" });
      } else {
        res.status(200).send({ message: "ok" });
      }
    });
    ////////////////////

    let transporter = nodemailer.createTransport({
      service: "gmail", // 메일 보내는 곳
      host: "smtp.gmail.com",
      secure: false,
      auth: {
        user: process.env.MAIL, // 보내는 메일의 주소
        pass: process.env.MAIL_PWD, // 보내는 메일의 비밀번호
      },
    });

    // 메일 옵션
    let mailOptions = {
      from: process.env.MAIL, // 보내는 메일의 주소
      to: email, // 수신할 이메일
      subject: "studylog 인증메일입니다.", // 메일 제목
      //내용: 인증번호
      html: `<h1>안녕하세요 studylog입니다. 메일인증을 하시려면 밑에 인증하기를 눌러주세요~</h1>
            <a href='http://localhost:4000/signup/auth?email=${email}&certNum=${certNum}'>인증하기</a>`,
    };

    // 메일 발송
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        res.status(200).json({ message: "이메일 보내기 완료!" });
      }
    });
  },

  auth: (req: Request, res: Response) => {
    console.log(req.query);
    let { email, certNum } = req.query;

    models.auth(email, certNum, (error, result) => {
      if (error) {
        res.status(500).send({ message: "서버에러!" });
      } else {
        console.log(result);
        // res.send({ result: result[0].id, message: "인증완료!" });
        res.write("<script>alert('success')</script>");
      }
    });
  },
};
