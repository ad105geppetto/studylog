import React, { useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import styled from "styled-components";

const SERVER = process.env.REACT_APP_SERVER;
const OAUTH_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const OAUTH_SECRET = process.env.REACT_APP_GOOGLE_CLIENT_SECRET;
const OAUTH_URL =
  "https://accounts.google.com/o/oauth2/v2/auth?client_id=631273485611-t8h8qol18tpug6pupv0tb4nsq4mfl5js.apps.googleusercontent.com&redirect_uri=http://localhost:3000&response_type=code&scope=openid";

// `https://accounts.google.com/o/oauth2/v2/auth?client_id=${OAUTH_ID}&redirect_uri=http://localhost:3000&response_type=code&scope=openid`;

const Signup = () => {
  const [userInfo, setUserInfo] = useState({
    id: "",
    pwd: "",
    pwdCheck: "",
    email: "",
  }); // 회원정보

  const [errMsg, setErrMsg] = useState({
    idMsg: "",
    pwdMsg: "",
    pwdCheckMsg: "",
    emailMsg: "",
  }); // 에러 메세지

  const [validCheck, setValidCheck] = useState({
    id: false,
    pwd: false,
    pwdCheck: false,
    email: false,
  }); // 유효성 체크

  // -------------  userInfo 데이터 세팅 및 유효성 체크---------------------
  const onUserInfo = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...userInfo, [key]: e.target.value });
    const value = e.target.value;

    switch (key) {
      case "id":
        const idRegex = /^[a-z]+[a-z0-9]{1,10}$/;
        if (!idRegex.test(value)) {
          setErrMsg({ ...errMsg, idMsg: "올바르지 못 한 아이디 입니다" });
        } else if (value.length < 3 || value.length > 10) {
          setErrMsg({ ...errMsg, idMsg: "아이디는 3글자 이상 10글자 미만 입니다. " });
        } else {
          setErrMsg({ ...errMsg, idMsg: "" });
        }

        break;
      case "pwd":
        if (value.length < 5 || value.length > 15) {
          setErrMsg({ ...errMsg, pwdMsg: "비밀번호는 5글자 이상 15글자 미만 입니다." });
          setValidCheck({ ...validCheck, pwd: false });
        } else {
          setErrMsg({ ...errMsg, pwdMsg: "" });
          setValidCheck({ ...validCheck, pwd: true });
        }
        break;
      case "pwdCheck":
        if (userInfo.pwd === value) {
          setErrMsg({ ...errMsg, pwdCheckMsg: "" });
          setValidCheck({ ...validCheck, pwdCheck: true });
        } else {
          setErrMsg({ ...errMsg, pwdCheckMsg: "비밀번호가 일치하지 않습니다." });
          setValidCheck({ ...validCheck, pwdCheck: false });
        }
        break;
      case "email":
        const emailRegex =
          /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        if (!emailRegex.test(value)) {
          setErrMsg({ ...errMsg, emailMsg: "올바르지 못 한 이메일 형식입니다." });
        } else {
          setErrMsg({ ...errMsg, emailMsg: "" });
        }
        break;
    }
    console.log(userInfo);
    console.log(errMsg);
    console.log(validCheck);
  };
  // ----------------------------------------------------------------------------

  // ------------------------- 아이디 중복 체크 검사 -------------------------
  const onCheckUserId = () => {
    axios
      .post(`${SERVER}/check`, { userID: userInfo.id })
      .then((res: AxiosResponse) => {
        switch (res.status) {
          case 200:
            setErrMsg({ ...errMsg, idMsg: "사용 가능한 아이디 입니다." });
            setValidCheck({ ...validCheck, id: true });
            break;
          case 409:
            setErrMsg({ ...errMsg, idMsg: "아이디가 중복 됩니다." });
            break;
          case 500:
            setErrMsg({
              ...errMsg,
              idMsg: "다시 한 번 시도해주세요 반복되는 경우 재접속을 권장드립니다.",
            });
        }
      })
      .catch((err: AxiosError) => console.log(err));
  }; //  -----------------------------------------------------------------

  //  ------------------------------ 회원가입 요청  전송 ----------------------------
  const onSingup = () => {
    axios
      .post(`${SERVER}/signup`, {
        userID: userInfo.id,
        password: userInfo.pwd,
        email: userInfo.email,
      })
      .then((res: AxiosResponse) => {
        console.log(res);
        // 메인페이지로 리다이렉트
      })
      .catch((err: AxiosError) => {
        console.log(err);
      });
  };
  //  -----------------------------------------------------------------------
  //  ------------------------------ 인증메일 전송 ----------------------------
  const onVerifyEmail = () => {
    axios
      .post(`${SERVER}/signup/auth`, { email: userInfo.email })
      .then((res: AxiosResponse) => {
        switch (res.status) {
          case 200:
            //
            setValidCheck({ ...validCheck, email: true });
            break;
          default:
            setValidCheck({ ...validCheck, email: false });
        }
      })
      .catch((err: AxiosError) => {
        console.log(err);
      });
  };
  //  -----------------------------------------------------------------------

  //  ---------------------------------GOOGLE ---------------------------

  const oauthpath = () => {
    window.location.assign(OAUTH_URL);
  };

  /*
  https://accounts.google.com/o/oauth2/v2/auth?client_id=631273485611-t8h8qol18tpug6pupv0tb4nsq4mfl5js.apps.googleusercontent.com&redirect_uri=http://localhost:3000&response_type=code&scope=openid

---

  http://localhost:3000/?code=4%2F0AX4XfWgCghLu-WNeTgyGHZbXu-mg4DtuniFDSLDYstnNtjJdO1cNMrN_eKYyvepVXe35AQ&scope=openid&authuser=0&prompt=consent

  
  ---

  https://accounts.google.com/o/oauth2/v2/auth/identifier?
  scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile&state=%7B%22next%22%3A%22%2F%40lov%22%7D
  
  &response_type=code
  &client_id=512153499356-4sg3s216vvqiv5kjfstal7dd2c1gc1an.apps.googleusercontent.com
  &redirect_uri=https%3A%2F%2Fv2.velog.io%2Fapi%2Fv2%2Fauth%2Fsocial%2Fcallback%2Fgoogle
  &flowName=GeneralOAuthFlow


axios.get? 
https://accounts.google.com/o/oauth2/v2/auth?
client_id=
response_type = code
scope=openid
redirect_uri=

1. 클라이언트 -> Google / 구글님 인증 코드 좀 주실래요?
2. Google -> 클라이언트 / ㅇㅋㅇㅋ 인증 url 드림 
3. 클라 -> 서버  / 서버님 인증 url 따왔어요
4. 서버 -> Google / 구글님 이게 인증 url 이라는데 토큰이랑 바꾸져
5. Google -> 서버 / ㅇㅋㅇㅋ 여기 토큰 드림 
6. 서버 -> 클라 / 인증 토큰으로 바꿔왔다 받아라! 

   code=4%2F0AX4XfWjoulphCyjKTQsMFJbhmTFekFnQB5Njeip6m_EYeCi0-MJi2-Q5zeGvp5XHkFWAbQ&scope=openid&authuser=0&prompt=consent

   요청해서 코드도 받아왔다. 근데 이건 그냥 내꺼잖아
   URL의 일부만 보내 줄 수 있나? 
   이걸 불특정 다수를 보내줘야 한다는거잖아?
   그건 어떻게 하지? 
*/
  return (
    <div>
      <form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
        }}
      >
        <h1> 회원가입요 </h1>
        <div>
          <input
            type="text"
            placeholder="ID를 입력하세요"
            onChange={onUserInfo("id")}
            maxLength={10}
            required
          />
          <button type="button" onClick={onCheckUserId}>
            중복체크
          </button>
          <div>{errMsg.idMsg} </div>
        </div>

        <div>
          <input
            type="password"
            placeholder="비밀번호를 입력하세요"
            onChange={onUserInfo("pwd")}
            maxLength={15}
            required
          />
          <div>{errMsg.pwdMsg} </div>
          <input
            type="password"
            placeholder="비밀번호를 다시 입력하세요"
            onChange={onUserInfo("pwdCheck")}
            maxLength={15}
            required
          />
          <div>{errMsg.pwdCheckMsg}</div>
        </div>
        <div>
          <input
            type="text"
            placeholder="이메일을 입력하세요"
            onChange={onUserInfo("email")}
            required
          />
          <button onClick={onVerifyEmail}>인증</button>
          <div>{errMsg.emailMsg}</div>
        </div>
        <div>
          <button
            disabled={
              validCheck.email && validCheck.id && validCheck.pwd && validCheck.pwdCheck
                ? false
                : true
            }
            onClick={onSingup}
          >
            가입
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;

/*

 유저 아이디에 입력값을 넣고,
 입력값의 제한은 공백, 특수문자 허용 불가


 비밀번호도 동일하게 공백,특수문자 허용 불가 
 + 비밀번호는 문자+숫자의 조합으로?

 이메일은 이메일 정규식 

중복체크 버튼 클릭시 

server로 post 요청을 보내며, 바디에는 userId를 담아서 전달
응답 받는 status 200 > 사용 가능한 아이디 입니다. 
> validCheck.id => true 
응답이 409 >  다른 아이디를 사용해주세요 
validCheck.id => false
응답이 500 >  네트워크에 문제가 있습니다. 다시 한 번 시도해주세요, 문제가 반복되는 경우 다시 한 번 
접속하시길 권장드립니다.
validCheck.id => false

Oauth의 흐름 

1. 클라이언트 -> Google / 구글님 인증 코드 좀 주실래요?
2. Google -> 클라이언트 / ㅇㅋㅇㅋ 인증 url 드림 
3. 클라 -> 서버  / 서버님 인증 url 따왔어요
4. 서버 -> Google / 구글님 이게 인증 url 이라는데 토큰이랑 바꾸져
5. Google -> 서버 / ㅇㅋㅇㅋ 여기 토큰 드림 
6. 서버 -> 클라 / 인증 토큰으로 바꿔왔다 받아라! 

7. 클라 => ㅇㅋ 이 토큰으로 이제 로그인 함 ㅋ 

Oath에 담긴 인증토큰과
자체 회원가입으로 생성되는 인증토큰은 다르지
그건 서버에서 구별해서 전달해주나? 

일단 내가 만들어 줘야 할 것은
Google 로 인증 코드를 받아오는것을 해야 해 ! 


*/
