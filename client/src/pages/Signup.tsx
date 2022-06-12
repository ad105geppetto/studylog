import React, { useState, useEffect } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import Subtitle from "components/Subtitle";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
// import { Wrapper, Input } from "styles/Userpage_style";

const GridLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 140px);
  grid-template-rows: repeat(10, 100px);
  grid-column-gap: 20px;
  grid-template-areas:
    "Logo . . . . . . . . . . ."
    "Logo . . . Title Title Title Title . . . . "
    ". . . . . . . . . . . ."
    ". . . Content Content Content Content Content Content . . ."
    ". . . Content Content Content Content Content Content . . ."
    ". . . Content Content Content Content Content Content . . ."
    ". . . Content Content Content Content Content Content . . ."
    ". . . Content Content Content Content Content Content . . ."
    ". . . Content Content Content Content Content Content . . .";
  /*
    ". . . Content Content Content Content . . ."
    ". . . Content Content Content Content . . ."
    ". . . Content Content Content Content . . ."
    ". . . Content Content Content Content . . ."; */
`;

const Logo = styled.img`
  height: 20vh;
  width: 10vw;
`;

const Form = styled.form`
  grid-area: Content;
  background-color: blue;
`;

const Input = styled.input`
  grid-area: Input;
  background-color: white;
`;

const SERVER = process.env.REACT_APP_SERVER;

export const Signup = () => {
  const navigate = useNavigate();
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
  useEffect(() => {
    setErrMsg(errMsg);
  }, [errMsg]);

  // -------------  userInfo 데이터 세팅 및 유효성 체크---------------------
  const onUserInfo = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...userInfo, [key]: e.target.value });
    const value = e.target.value;

    switch (key) {
      case "id":
        const idRegex = /^[a-z0-9]{0,10}$/;
        if (!idRegex.test(value)) {
          setErrMsg({ ...errMsg, idMsg: "올바르지 못 한 아이디 입니다." });
        } else if (value.length < 3 || value.length > 10) {
          setErrMsg({ ...errMsg, idMsg: "아이디는 3글자 이상 10글자 미만 입니다. " });
        } else {
          setErrMsg({ ...errMsg, idMsg: "" });
        }

        break;
      case "pwd":
        if (value.includes(" ")) {
          setErrMsg({ ...errMsg, pwdMsg: "공백은 사용 할 수 없습니다" });
          setValidCheck({ ...validCheck, pwd: false });
        } else if (value.length < 5 || value.length > 15) {
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
          setValidCheck({ ...validCheck, email: true });
        }
        break;
    }
    console.log(userInfo);
  }; //  -----------------------------------------------------------------

  // ------------------------- 아이디 중복 체크 검사 -------------------------
  const onCheckUserId = () => {
    axios
      .post(`${SERVER}/check`, { userId: userInfo.id })
      .then((res: AxiosResponse) => {
        console.log(res);
        console.log(userInfo.id);
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
        userId: userInfo.id,
        password: userInfo.pwd,
        email: userInfo.email,
      })
      .then((res: AxiosResponse) => {
        navigate("/");
        // 메인페이지로 리다이렉트
      })
      .catch((err: any) => {
        // if (!err.response) {return
        // } else if(err.response?.data.message === '보내신 이메일에서 인증 버튼을 클릭 해주세요.' )
        console.log("에러메세지", err);

        if (err.response.data.message === "보내신 이메일에서 인증 버튼을 클릭 해주세요.") {
          setErrMsg({
            ...errMsg,
            emailMsg: "요청하신 메일에서 인증 버튼을 눌러주세요.",
          });
        }
      });
  }; //  -----------------------------------------------------------------

  //  ------------------------------ 인증메일 전송 ----------------------------
  const onVerifyEmail = () => {
    axios
      .post(`${SERVER}/signup/mail`, { email: userInfo.email })
      .then((res: AxiosResponse) => {
        console.log(res);
      })
      .catch((err: AxiosError) => {
        console.log("에러메세지", err);
      });
    console.log(userInfo);
  }; //  -----------------------------------------------------------------

  return (
    <GridLayout>
      <Subtitle text="회원가입" />
      <Logo alt="LOGO" src="asset/white_logo.png" object-fit="cover" />
      <Form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
        }}
      >
        <div>
          <Input
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
          <Input
            type="password"
            placeholder="비밀번호를 입력하세요"
            onChange={onUserInfo("pwd")}
            maxLength={15}
            required
          />
          <div>{errMsg.pwdMsg} </div>
          <Input
            type="password"
            placeholder="비밀번호를 다시 입력하세요"
            onChange={onUserInfo("pwdCheck")}
            maxLength={15}
            required
          />
          <div>{errMsg.pwdCheckMsg}</div>
        </div>
        <div>
          <Input
            type="text"
            placeholder="이메일을 입력하세요"
            onChange={onUserInfo("email")}
            required
          />
          <button type="button" onClick={onVerifyEmail}>
            인증
          </button>
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
      </Form>
    </GridLayout>
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
