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
      <button type="button" onClick={() => navigate("/todos")}>
        Todos
      </button>
      <button type="button" onClick={() => navigate("/room/id")}>
        room
      </button>
      <button type="button" onClick={() => navigate("/creatingroom")}>
        creatingroom
      </button>
      <button type="button" onClick={() => navigate("/roomlist")}>
        roomlist
      </button>
      <button type="button" onClick={() => navigate("/idInquiry")}>
        idInquiry
      </button>
      <button type="button" onClick={() => navigate("/pwInquiry")}>
        pwInquiry
      </button>
    </div>
  );
};

export default Landing;
