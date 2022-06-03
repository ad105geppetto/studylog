// import React, { useState } from "react";
// import axios from "axios";
import { useNavigate } from "react-router-dom";

const Userid = () => {
  const navigate = useNavigate();

  const onNavigate = (url: string) => {
    console.log("들어옴");
    return (e: React.MouseEvent<HTMLButtonElement>) => {
      console.log("navi로 들어옴");
      navigate(url);
    };
  };

  // const handleInputValue = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setuserInfo({ ...userInfo, [key]: e.target.value });
  // };

  return (
    <div className="">
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
        <span>비밀번호</span>
        <div>
          <input></input>
        </div>
      </div>
    </div>
  );
};

export default Userid;
