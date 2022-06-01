import React, { useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import styled from "styled-components";

const Login = () => {
  const SERVER = process.env.REACT_APP_SERVER;
  const OAUTH_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const OAUTH_SECRET = process.env.REACT_APP_GOOGLE_CLIENT_SECRET;
  const OAUTH_URL =
    "https://accounts.google.com/o/oauth2/v2/auth?client_id=631273485611-t8h8qol18tpug6pupv0tb4nsq4mfl5js.apps.googleusercontent.com&redirect_uri=http://localhost:3000&response_type=code&scope=openid";

  const oauthpath = () => {
    window.location.assign(OAUTH_URL);
  };

  return (
    <div>
      <div></div>
      <form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
        }}
      >
        <div>
          <div></div>
          <input />
        </div>{" "}
        <div>
          <div></div>
          <input />
        </div>
        <div>
          <button>1</button>
          <button>2</button>
        </div>
        <div>
          <button>3</button>
        </div>
        <div>
          <button>4</button>
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
