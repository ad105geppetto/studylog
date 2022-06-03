import { Request, Response, NextFunction } from "express";
import nodemailer from "nodemailer";
const models = require("../models/Signup");

export default {
  post: (req: Request, res: Response, next: NextFunction) => {
    // verification의 최신값만 찾아서
    // verification의 값이 1이면 이메일 인증한 것
    // verification의 값이 0이면 이메일 인증 안한 것
    // res.send({message:"이메일 인증을 해주세요."})
  },

  mail: (req: Request, res: Response, next: NextFunction) => {
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
      host: "smtp.gmlail.com",
      secure: false,
      auth: {
        user: "chc8909@gmail.com", // 보내는 메일의 주소
        pass: "sjrnfl09!@", // 보내는 메일의 비밀번호
      },
    });

    // 메일 옵션
    let mailOptions = {
      from: "chc8909@gmail.com", // 보내는 메일의 주소
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

  auth: (req: Request, res: Response, next: NextFunction) => {
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
