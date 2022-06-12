import React, { useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logIn } from "../action/index";

const SERVER = process.env.REACT_APP_SERVER;
const OAUTH_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const OAUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${OAUTH_ID}&redirect_uri=http://localhost:3000&response_type=code&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile%20openid&access_type=offline&`;

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    id: "",
    pwd: "",
  });
  const [errMsg, setErrMsg] = useState("");

  // ----------------------------- 로그인 정보 입력---------------------------
  const onUserInfo = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...userInfo, [key]: e.target.value });
  };
  // ---------------------------------------------------------------------------

  // ------------------- 로그인 요청 -----------------------------
  const onClickLoginBtn = () => {
    axios
      .post(
        `${SERVER}/login`,
        { userId: userInfo.id, password: userInfo.pwd }
        // { type: "application/json" }
      )
      .then((res: AxiosResponse) => {
        const accessToken = res.data.accessToken;
        const id = res.data.userInfo.id;
        const userId = res.data.userInfo.userId;
        const email = res.data.userInfo.email;
        const profile = res.data.userInfo.profile;

        dispatch(logIn(accessToken, id, userId, email, profile));

        navigate("/");
      })
      .catch((err: AxiosError) => {
        console.log(err);
      });
  };
  // ----------------------------- 구글 OAUTH 요청 -----------------------
  const oauthPath = () => {
    window.location.assign(OAUTH_URL);
    //  버튼 클릭시 Oauth 정보가 담긴 url로 이동시킴
  };
  // ---------------------------------------------------------------------------
  //  ------------------------ 페이지 전환 -----------------------------------
  const onNavigate = (url: string) => (e: React.MouseEvent<HTMLButtonElement>) => {
    navigate(url);
  };
  //  ------------------------------------------------------------------------------
  return (
    <div>
      <div>로그인</div>
      <form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
        }}
      >
        <div>
          <div>아이디</div>
          <input
            type="text"
            onChange={onUserInfo("id")}
            placeholder="아이디를 입력해주세요"
            required
          />
        </div>
        <div>
          <div>비밀번호</div>
          <input
            type="password"
            onChange={onUserInfo("pwd")}
            placeholder="비밀번호를 입력해주세요"
            required
          />
        </div>
        <div>
          <button onClick={onClickLoginBtn}>로그인</button>
          <button type="button" onClick={onNavigate("/signup")}>
            회원가입
          </button>
        </div>
        <div>
          <button type="button" onClick={onNavigate("/idinquiry")}>
            아이디/비밀번호 찾기
          </button>
        </div>
        <div>
          <button onClick={oauthPath}> GOOGLE 계정 로그인 </button>
        </div>
      </form>
    </div>
  );
};

export default Login;

//  ---------------------------------GOOGLE ---------------------------
/*
  https://accounts.google.com/o/oauth2/v2/auth?client_id=631273485611-t8h8qol18tpug6pupv0tb4nsq4mfl5js.apps.googleusercontent.com&redirect_uri=http://localhost:3000&response_type=code&scope=openid

  h
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
