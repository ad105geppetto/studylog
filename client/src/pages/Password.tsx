import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios, { AxiosError, AxiosResponse } from "axios";

const SERVER = process.env.REACT_APP_SERVER || "http://localhost:3000";

const Password = () => {
  const navigate = useNavigate();

  const onNavigate = (url: string) => {
    return (e: React.MouseEvent<HTMLButtonElement>) => {
      navigate(url);
    };
  };

  // const onClickFindId = async () => {

  return (
    <div>
      {/* <div>
        <nav></nav>

        <span>
          <button type="button" onClick={onNavigate("/login")}>
            로그인
          </button>
        </span>
        <span>
          <button type="button" onClick={onNavigate("/signup")}>
            회원가입
          </button>
        </span>
      </div> */}

      <div>
        <span>비밀번호</span>
        <div>
          <input></input>
        </div>
      </div>
    </div>
  );
};

export default Password;
