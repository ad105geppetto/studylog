import { Signup } from "pages/Signup";
import Login from "pages/Login";
import Landing from "pages/Landing";
import Mypage from "pages/Mypage";
import Room from "pages/Room";
import axios, { AxiosError, AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import Todo from "pages/Todo";
import Creatingroom from "./pages/Creatingroom";
import { useStore } from "react-redux";
import { BrowserRouter, Route, Routes, useNavigate, useParams } from "react-router-dom";
import Boards from "components/Boards";
import Roomlist from "pages/Roomlist";
import Nav from "./components/Nav";
import Idinquiry from "./components/Idinquiry";
import Pwinquiry from "./components/Pwinquiry";
import Findinfo from "pages/Findinfo";

import Total from "pages/Total";
// import styled from "styled-components";
// import "./App.css";
// import { Pagenation } from "./components/Pagenation";

// import { createGlobalStyle } from "styled-components";

function App() {
  // ------------------------------------------------------------------------------------------------

  const SERVER = process.env.REACT_APP_SERVER;
  let { userId } = useParams();
  const url = new URL(window.location.href);
  const authCode = url.searchParams.get("code");

  // --------------------------- OAUTH 로그인---------------------
  const sendAuthCode = (authCode: any) => {
    axios
      .post(`${SERVER}/Oauth`, { authorizationCode: authCode })
      .then((res: AxiosResponse) => {
        // console.log(res);
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
    //------------------------------------------------------------------------------------------------
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/todos" element={<Todo />} />
        <Route path="/room">
          <Route path=":roomId" element={<Room />} />
        </Route>
        <Route path="/creatingroom" element={<Creatingroom />} />
        <Route path="/roomlist" element={<Roomlist />} />
        <Route path="/idInquiry" element={<Idinquiry />} />
        <Route path="/pwInquiry" element={<Pwinquiry />} />
        <Route path="/Findinfo" element={<Findinfo />} />
        <Route path="/Nav" element={<Nav />} />
        <Route path="/Total" element={<Total />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
