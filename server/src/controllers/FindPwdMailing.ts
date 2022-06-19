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

const mailOpt = (user_data, title, contents, html) => {
  const mailOptions = {
    from: process.env.MAIL_ID,
    to: user_data,
    subject: title,
    text: contents,
    html: html,
  };

  return mailOptions;
};

// 메일 전송
const sendMail = (mailOption) => {
  mailPoster.sendMail(mailOption, function (error, info) {
    if (error) {
      console.log("에러 " + error);
    } else {
      console.log("전송 완료 " + info.response);
    }
  });
};

export default {
  post: (req, res) => {
    const email = req.body.email;
    const data = [{ dataValues: email }];
    let title = "[Studylog] 고객님의 인증코드는 다음과 같습니다.";
    let randomAuth = String(Math.floor(Math.random() * 1000000));
    const contents = () => {
      return `${randomAuth}`;
    };
    const html = `
      <div>
        <div>
          <div style="float: left">
            <img src="https://cdn.pixabay.com/photo/2015/04/15/02/43/waves-723178_960_720.png" width="100" height="100" />
          </div>
          <div>
            <span style="font-size: 1.8rem">함께 공부하고 기록할 땐</span>
            <br />
            <span style="font-size: 1.8rem">Studylog</span>
          </div>
        </div>
        <br />
        <h2>고객님의 인증코드입니다.</h2>
        <h3>${email}님 안녕하세요,</h3>
        <h3>고객님의 인증코드는 다음과 같습니다.</h3>
        <br />
        <div>
          <span>인증코드 : </span>
          <span>${randomAuth}</span>
        </div>
      </div>`;

    const mailOption = mailOpt(data[0].dataValues, title, contents(), html);
    sendMail(mailOption);
    pwdMailing.create(randomAuth, email, 0, (error, result1) => {
      if (error) {
        res.status(500).json({ message: "Internal Sever Error" });
      } else {
        res.status(200).json({ message: "ok" });
      }
    });
  },
};
