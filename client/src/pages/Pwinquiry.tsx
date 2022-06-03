import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;

const Pwinquiry = () => {
  const navigate = useNavigate();
  // const onNavigate = (url: string) => (e: React.MouseEvent<HTMLButtonElement>) => {
  //   navigate(url);
  // };
  const onNavigate = (url: string) => {
    console.log("들어옴");
    return (e: React.MouseEvent<HTMLButtonElement>) => {
      console.log("navi로 들어옴");
      navigate(url);
    };
  };

  const [userInfo, setuserInfo] = useState({
    userId: "",
    email: "",
    certNum: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleInputValue = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setuserInfo({ ...userInfo, [key]: e.target.value });
  };

  const handleUserpwd = async () => {
    if (userInfo.email) {
      // await axios.post(`${process.env.REACT_APP_SERVER}/userpwd/auth`, {
      //   userId: userInfo.userId,
      //   certNum: userInfo.certNum,
      // })
      // .then((res) => {
      //   navigate("")
      // })
      axios
        .post(`${process.env.REACT_APP_SERVER}/userpwd/auth`, {
          userId: userInfo.userId,
          certNum: userInfo.certNum,
        })
        .then(() => {
          setErrorMessage("");
          navigate("/Password");
        });

      //서버에서 받아온 데이터(객체)에서 인증번호와 인증번호칸에
      // 유저가 입력하는 인증번호가 같은가를 비교 후 같으면 찾기 버튼이 활성화 된다.
      // disable사용
      //서버에서 받아온 인증번호를 상태로 저장하거나 변수로 저장. 상태가 더 유용하다
    } else {
      setErrorMessage("아이디와 인증번호를 입력하세요");
    }
  };

  // const login = () => {
  //   window.location.href = "https://localhost:4000/login";
  // };

  // const signup = () => {
  //   window.location.href = "https://localhost:4000/signup";
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
        <span>
          <button>아이디 찾기</button>
        </span>
        <span>
          <button>비밀번호 찾기</button>
        </span>
      </div>

      <div>
        <div>
          <span>아이디</span>
          <input type="id" onChange={handleInputValue("id")} />
        </div>
        <div>
          <span>이메일</span>
          <input type="email" onChange={handleInputValue("email")} />
        </div>
        <div>
          <span>인증번호</span>
          <input
            type="certNum"
            onChange={handleInputValue("certNum")}
            placeholder="인증번호 6자리 숫자 입력"
          />
        </div>

        <form>
          <button type="submit" onClick={handleUserpwd}>
            찾기
          </button>
          <div className="alert-box">{errorMessage}</div>
        </form>
      </div>
    </div>
  );
};

export default Pwinquiry;
