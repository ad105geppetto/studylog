import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import Userid from "./Userid";

axios.defaults.withCredentials = true;

const Idinquiry = () => {
  const navigate = useNavigate();

  const onNavigate = (url: string) => {
    return (e: React.MouseEvent<HTMLButtonElement>) => {
      navigate(url);
    };
  };

  const [userInfo, setuserInfo] = useState({
    email: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleInputValue = (key: string) => (e: any) => {
    setuserInfo({ ...userInfo, [key]: e.target.value });
  };

  const handleUserid = async () => {
    if (userInfo.email) {
      await axios.post(`${process.env.REACT_APP_SERVER}/userid`, {
        email: userInfo.email,
      });
      // .then(() => {})
    } else {
      setErrorMessage("이메일을 입력하세요");
    }
  };

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
      {/* 로그인, 회원가입은 구현이 되어있으니 버튼을 누르면 이동할 수 있도록 연결만 해주면 되는것인가? */}
      <div>
        <span>
          <button>아이디 찾기</button>
        </span>
        <span>
          <button>비밀번호 찾기</button>
        </span>
      </div>

      <div>
        <div>
          <span>이메일</span>
          <input type="email" onChange={handleInputValue("email")} />
        </div>
        <form>
          <button type="submit" onClick={handleUserid}>
            찾기
          </button>
          <div className="alert-box">{errorMessage}</div>
        </form>
      </div>
    </div>
  );
};

export default Idinquiry;
