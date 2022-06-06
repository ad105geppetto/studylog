import { Signup } from "pages/Signup";
import Login from "pages/Login";
import Landing from "pages/Landing";
import Mypage from "pages/Mypage";
import axios, { AxiosError, AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import Todo from "pages/Todo";
import { useStore } from "react-redux";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Board from "components/Board";
import Boards from "components/Boards";

function App() {
  const SERVER = process.env.REACT_APP_SERVER;

  const url = new URL(window.location.href);
  const authCode = url.searchParams.get("code");

  // --------------------------- OAUTH 로그인---------------------
  const sendAuthCode = (authCode: any) => {
    console.log("123");
    axios
      .post(`${SERVER}/Oauth`, { authorizationCode: authCode })
      .then((res: AxiosResponse) => {
        console.log(res);
      })
      .catch((err: AxiosError) => {
        console.log("err:", err);
      });
  };

  useEffect(() => {
    sendAuthCode(authCode);
  }, []);
  // outh 서버로 전송이 안댐 , 뭔가 틀렸을텐데 뭘까
  // ----------------------------------------

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Boards />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/todos" element={<Todo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
