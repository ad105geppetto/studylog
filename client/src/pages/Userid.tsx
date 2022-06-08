// import React, { useState } from "react";
// import axios from "axios";
import { useNavigate } from "react-router-dom";

const Userid = () => {
  const navigate = useNavigate();

  const onNavigate = (url: string) => {
    return (e: React.MouseEvent<HTMLButtonElement>) => {
      navigate(url);
    };
  };

  // const handleInputValue = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setuserInfo({ ...userInfo, [key]: e.target.value });
  // };

  return (
    <div>
      <div>
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
      </div>

      <div>
        <span>
          <button>아이디 찾기</button>
        </span>
        <span>
          <button>비밀번호 찾기</button>
        </span>
      </div>

      <div>
        <span>비밀번호</span>
        <span></span>
      </div>
    </div>
  );
};

export default Userid;
