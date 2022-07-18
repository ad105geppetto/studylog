import React, { useState, useEffect, useCallback } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logIn } from "../action/index";
import { FcGoogle } from "react-icons/fc";
import {
  Wrapper,
  Input,
  LargeButton,
  SmallButton,
  Title,
  Logo,
  ButtonWrapper,
  LoginErrorMsg,
  ButtonWrapper2,
  Form,
} from "styles/Userpage_style";

const Login = () => {
  const CLIENT = process.env.REACT_APP_CLIENT || "http://localhost:3000/login";
  const SERVER = process.env.REACT_APP_SERVER || "http://localhost:4000";
  const OAUTH_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const OAUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${OAUTH_ID}&redirect_uri=${CLIENT}&response_type=code&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile%20openid&access_type=offline&`;

  const [userInfo, setUserInfo] = useState({
    id: "",
    pwd: "",
  });
  const [errMsg, setErrMsg] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ----------------------------- 로그인 정보 입력---------------------------
  const promptUserInfo = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...userInfo, [key]: e.target.value });
  }; // ---------------------------------------------------------------------------

  // ------------------- 로그인 요청 -----------------------------
  const loginHandler = () => {
    axios
      .post(`${SERVER}/login`, { userId: userInfo.id, password: userInfo.pwd })
      .then((res: AxiosResponse) => {
        const accessToken = res.data.accessToken;
        const id = res.data.userInfo.id;
        const userId = res.data.userInfo.userId;
        const email = res.data.userInfo.email;
        const profile = res.data.userInfo.profile;

        dispatch(logIn(accessToken, id, userId, email, profile));
        // 로그인시 redux로 상태값을 저장해주기

        navigate("/roomlist");
      })
      .catch((err: AxiosError) => {
        console.log("로그인 에러메세지 : ", err);
        setErrMsg(() => "아이디 또는 비밀번호를 확인해주세요.");
      });
  }; //-----------------------------------------------------------------------

  // ----------------------------- 구글 OAUTH 요청 -----------------------
  const googleLoginHandler = () => {
    window.location.assign(OAUTH_URL);
    //  버튼 클릭시 Oauth 정보가 담긴 url로 페이지를 이동시킴
    window.localStorage.setItem("userType", "google");
  }; // --------------------------------------------------------------

  // ----------------------------- 카카오 OAUTH 요청 -----------------------
  const kakaoLoginHandler = () => {
    axios
      .get(`${SERVER}/kakaoOauth`)
      .then((res: AxiosResponse) => {
        window.location.assign(res.data.data);
        window.localStorage.setItem("userType", "kakao");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // --------------------------------------------------------------

  //  ------------------------ 페이지 전환 -----------------------------------
  const onNavigate = (url: string) => (e: React.MouseEvent<HTMLButtonElement>) => {
    navigate(url);
  }; //  ----------------------------------------------------------------------

  const sendGoogleAuthCode = useCallback(() => {
    // 구글의 Authorization Code를 서버로 보내어 Access Token 받기
    const url = new URL(window.location.href);
    const authCode = url.searchParams.get("code");

    if (authCode === null) {
      return;
    }

    axios
      .post(`${SERVER}/Oauth`, { authorizationCode: authCode })
      .then((res: AxiosResponse) => {
        if (res.data.message === "이미 카카오 계정으로 가입한 유저입니다.") {
          alert(res.data.message);
          return res.data.message;
        }
        const accessToken = res.data.accessToken;
        const userInfo = res.data.userInfo;
        dispatch(
          logIn(accessToken, userInfo.id, userInfo.userId, userInfo.email, userInfo.profile)
        );
      })
      .then((data) => {
        if (data === "이미 카카오 계정으로 가입한 유저입니다.") {
          return;
        } else {
          navigate("/roomlist");
        }
      })
      .catch((err: AxiosError) => {
        console.log("err:", err);
      });
  }, [SERVER, dispatch, navigate]);

  const sendKakaoAuthCode = useCallback(() => {
    // 카카오의 Authorization Code를 서버로 보내어 Access Token 받기
    const url = new URL(window.location.href);
    const authCode = url.searchParams.get("code");

    if (authCode === null) {
      return;
    }

    axios
      .post(`${SERVER}/kakaoOauth/redirect`, { authorizationCode: authCode })
      .then((data) => {
        if (data.data.message === "이미 구글 계정으로 가입한 유저입니다.") {
          alert(data.data.message);
          return data.data.message;
        }
        const accessToken = data.data.accessToken;
        const userInfo = data.data.userInfo;
        dispatch(
          logIn(accessToken, userInfo.id, userInfo.userId, userInfo.email, userInfo.profile)
        );
      })
      .then((data) => {
        if (data === "이미 구글 계정으로 가입한 유저입니다.") {
          return;
        } else {
          navigate("/roomlist");
        }
      })
      .catch((err: AxiosError) => {
        console.log(err);
      });
  }, [SERVER, dispatch, navigate]);

  useEffect(() => {
    const userType = window.localStorage.getItem("userType");
    if (userType === "google") {
      sendGoogleAuthCode();
    } else {
      sendKakaoAuthCode();
    }
  }, [sendGoogleAuthCode, sendKakaoAuthCode]);

  return (
    <div>
      <NavLink to="/roomlist">
        <Logo alt="LOGO" src="asset/white_logo.png" object-fit="cover" />
      </NavLink>
      <Wrapper>
        <Title>로그인</Title>
        <Form
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
          }}
        >
          <Input
            style={{ marginBottom: "2vh" }}
            type="text"
            onChange={promptUserInfo("id")}
            placeholder="아이디를 입력해주세요"
          />

          <Input
            type="password"
            onChange={promptUserInfo("pwd")}
            placeholder="비밀번호를 입력해주세요"
          />

          <LoginErrorMsg> {errMsg}</LoginErrorMsg>
          <ButtonWrapper>
            <SmallButton onClick={loginHandler}>로그인</SmallButton>

            <SmallButton type="button" onClick={onNavigate("/signup")}>
              회원가입
            </SmallButton>
          </ButtonWrapper>
          <ButtonWrapper2>
            <LargeButton type="button" onClick={onNavigate("/findinfo")}>
              아이디/비밀번호 찾기
            </LargeButton>
            <LargeButton type="button" onClick={googleLoginHandler}>
              <FcGoogle size="2rem" /> 구글 로그인
            </LargeButton>
            <LargeButton
              type="button"
              onClick={kakaoLoginHandler}
              style={{ backgroundColor: "#FEE500" }}
            >
              <img src="asset/kakao-simbole.png" width="30" height="25" alt="kakao-simbole" />
              카카오 로그인
            </LargeButton>
          </ButtonWrapper2>
        </Form>
      </Wrapper>
    </div>
  );
};

export default Login;
