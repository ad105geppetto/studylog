import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { logout } from "action";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

const SERVER = process.env.REACT_APP_SERVER;

const Nav = () => {
  const userInfo = useSelector((state: any) => state.userInfoReducer.userInfo);

  const [token, setToken] = useState(userInfo.accessToken);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onNavigate = (url: string) => {
    return (e: React.MouseEvent<HTMLButtonElement>) => {
      navigate(url);
    };
  };

  const onLogOutBtn = () => {
    axios
      .get(`${SERVER}/logout`, {
        headers: { authorization: `Bearer ${userInfo.accessToken}` },
      })
      .then((res: AxiosResponse) => {
        console.log(res.data);

        const accessToken = res.data.accessToken;
        dispatch(logout(accessToken));
        navigate("/");
      })
      .catch((err: AxiosError) => console.log(err));
  };

  return (
    <div>
      <nav>
        <ul>
          <span>The Nav </span>
          <span>
            <button type="button" onClick={() => navigate("/roomlist")}>
              Study List
            </button>
          </span>
          <span>
            <button type="button" onClick={onNavigate("/Room")}>
              Study Room
            </button>
          </span>
          <span>
            <button type="button" onClick={() => navigate("/todos")}>
              My Study
            </button>
          </span>
          {!token ? (
            <div>
              <span>
                <button type="button" onClick={() => navigate("/login")}>
                  로그인
                </button>
              </span>
              <span>
                <button type="button" onClick={() => navigate("/signup")}>
                  회원가입
                </button>
              </span>
            </div>
          ) : (
            <div>
              <span>
                <button type="button" onClick={onLogOutBtn}>
                  로그아웃
                </button>
              </span>
              <span>
                <button type="button" onClick={() => navigate("/mypage")}>
                  내정보
                </button>
              </span>
            </div>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
