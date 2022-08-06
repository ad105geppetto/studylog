import { Request, Response } from "express";
import { MysqlError } from "mysql";
import nodeMailer from "nodemailer";
import pwdMailing from "../models/FindPwdMailing";
import dotenv from "dotenv";
dotenv.config();

const mailPoster = nodeMailer.createTransport({
  service: "Naver",
  host: "smtp.naver.com",
  port: 587,
  auth: {
    user: process.env.MAIL_ID,
    pass: process.env.MAIL_PASSWORD,
  },
});

const mailOpt = (userEmail: string, title: string, contents: string, html: string) => {
  // 메일 Option 값 설정 함수
  const mailOptions = {
    from: process.env.MAIL_ID,
    to: userEmail,
    subject: title,
    text: contents,
    html: html,
  };

  return mailOptions;
};

const sendMail = (mailOption: Object) => {
  // 메일 전송 함수
  mailPoster.sendMail(mailOption, function (error, info) {
    if (error) {
      console.log("에러 " + error);
    } else {
      console.log("전송 완료 " + info.response);
    }
  });
};

export default {
  post: (req: Request, res: Response) => {
    const userEmail: string = req.body.email;
    const title = "[Studylog] 고객님의 인증코드는 다음과 같습니다.";
    const randomAuth = String(Math.floor(Math.random() * 1000000));
    const contents = `${randomAuth}`;
    const html = `
      <div>
        <div>
          <div style="float: left">
            <img src="https://studylog.tk/asset/dark_logo.png" width="100" height="100" />
          </div>
          <div>
            <span style="font-size: 1.8rem">함께 공부하고 기록할 땐</span>
            <br />
            <span style="font-size: 1.8rem">Studylog</span>
          </div>
        </div>
        <br />
        <h2>고객님의 인증코드입니다.</h2>
        <h3>${userEmail}님 안녕하세요,</h3>
        <h3>고객님의 인증코드는 다음과 같습니다.</h3>
        <br />
        <div>
          <span>인증코드 : </span>
          <span>${randomAuth}</span>
        </div>
      </div>`;

    const mailOption = mailOpt(userEmail, title, contents, html);
    sendMail(mailOption);
    pwdMailing.create(randomAuth, userEmail, 0, (error: MysqlError) => {
      if (error) {
        res.status(500).json({ message: "서버 에러" });
      } else {
        res.status(200).json({ message: "성공" });
      }
    });
  },
};
