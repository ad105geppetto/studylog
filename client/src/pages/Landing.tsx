import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button type="button" onClick={() => navigate("/signup")}>
        회원가입
      </button>
      <button type="button" onClick={() => navigate("/login")}>
        로그인
      </button>
      <button type="button" onClick={() => navigate("/mypage")}>
        마이페이지
      </button>
    </div>
  );
};

export default Landing;
