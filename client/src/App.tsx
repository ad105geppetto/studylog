import { Signup } from "pages/Signup";
import Login from "pages/Login";
import Landing from "pages/Landing";
import Mypage from "pages/Mypage";
import axios from "axios";
import { useEffect, useState } from "react";
import { useStore } from "react-redux";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";

function App() {
  const SERVER = process.env.REACT_APP_SERVER;
  const OAUTH_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const OAUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${OAUTH_ID}&redirect_uri=http://localhost:3000&response_type=code&scope=openid`;

  // --------------------------- OAUTH 로그인---------------------
  const sendAuthCode = (authCode: string | null) => {
    axios
      .post(`${SERVER}/Oauth`, { authCode })
      .then((res) => {})
      .catch((err) => {});
  };

  useEffect(() => {
    const url = new URL(window.location.href);
    const authCode = url.searchParams.get("code");
    console.log(url);
    console.log(authCode);
    sendAuthCode(authCode);
  }, []);
  // ----------------------------------------

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mypage" element={<Mypage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
