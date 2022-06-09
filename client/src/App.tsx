import { Signup } from "pages/Signup";
import Login from "pages/Login";
import Pwinquiry from "./components/Pwinquiry";
import Landing from "pages/Landing";
import Mypage from "pages/Mypage";
import Room from "pages/Room";
import axios, { AxiosError, AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import Todo from "pages/Todo";
import Creatingroom from "./pages/Creatingroom";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes, useNavigate, useParams } from "react-router-dom";
import Boards from "components/Boards";
import Roomlist from "pages/Roomlist";
import Idinquiry from "./components/Idinquiry";
import { io } from "socket.io-client";

const socket = io("http://localhost:4000", {
  withCredentials: true,
});
function App() {
  const userInfo = useSelector((state: any) => state.userInfoReducer.userInfo);
  const SERVER = process.env.REACT_APP_SERVER;
  const url = new URL(window.location.href);
  const authCode = url.searchParams.get("code");

  // --------------------------- OAUTH 로그인---------------------
  const sendAuthCode = (authCode: any) => {
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

  const socket = io("http://localhost:4000", {
    withCredentials: true,
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing socket={socket} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/todos" element={<Todo />} />
        <Route path="/room">
          <Route path=":roomId" element={<Room userInfo={userInfo} socket={socket} />} />
        </Route>
        <Route path="/creatingroom" element={<Creatingroom socket={socket} />} />
        <Route path="/roomlist" element={<Roomlist socket={socket} />} />
        <Route path="/idInquiry" element={<Idinquiry />} />
        <Route path="/pwInquiry" element={<Pwinquiry />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
