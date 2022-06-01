import nodeMailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config();

const mailPoster = nodeMailer.createTransport({
  service: 'Naver',
  host: 'smtp.naver.com',
  port: 587,
  auth: {
    user: process.env.MAIL,
    pass: process.env.MAIL_PWD
  }
});

const mailOpt = (user_data, title, contents) => {
  const mailOptions = {
    from: process.env.MAIL,
    to: user_data,
    subject: title,
    text: contents
  };

  return mailOptions;
}

// 메일 전송
const sendMail = (mailOption) => {
  mailPoster.sendMail(mailOption, function (error, info) {
    if (error) {
      console.log('에러 ' + error);
    }
    else {
      console.log('전송 완료 ' + info.response);
    }
  });
}

export default {
  post: (req, res) => {
    const email = req.body.email
    const result = [{ dataValues: email }]
    let title = "비밀번호 조회에 대한 6자리 숫자 입니다."
    let random = String(Math.floor(Math.random() * 1000000))
    const contents = () => {
      return random
    }
    const mailOption = mailOpt(result[0].dataValues, title, contents());
    sendMail(mailOption)

    res.json({ message: "ok" })
  }
}