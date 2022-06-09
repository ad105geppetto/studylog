import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";

interface socketInterface {
  socket: any;
}

const Landing = ({ socket }: socketInterface) => {
  const navigate = useNavigate();
  const userInfo = useSelector((state: any) => state.userInfoReducer.userInfo);
  const guestNum = (Math.random() * 10000000).toString().slice(0, 4);
  const annoy = `Annoy${guestNum}`;

  const onClickCreate = () => {
    if (!userInfo.userId) {
      return;
    }
    navigate("/creatingroom");
  };

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
      <button type="button" onClick={onClickCreate}>
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
