import React, { useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import Nav from "./Nav";

axios.defaults.withCredentials = true;
const SERVER = process.env.REACT_APP_SERVER;

const Pwinquiry = () => {
  const [userInfo, setUserInfo] = useState({
    userId: "",
    email: "",
    certNum: "",
  });

  const [userPwd, setUserPwd] = useState("");

  const [findPwd, setFindPwd] = useState(true);

  const [errorMessage, setErrorMessage] = useState("");

  const onUserInfo = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...userInfo, [key]: e.target.value });
  };

  const onClickFindAuth = () => {
    axios
      .post(`${SERVER}/userpwd/auth`, {
        email: userInfo.email,
      })
      .then((res: AxiosResponse) => {
        // setFindPwd(false);
        console.log(res);
        // setUserInfo(res.data.userInfo.certNum);
      })
      .catch((err: AxiosError) => {
        setErrorMessage("이메일을 입력하세요");
        console.log("이메일을 입력하세요", err);
      });
  };

  const onClickFindPwd = async () => {
    axios
      .post(`${SERVER}/userpwd`, {
        userId: userInfo.userId,
        certNum: userInfo.certNum,
      })
      .then((res: AxiosResponse) => {
        setFindPwd(false);
        console.log(res);
        setUserPwd(res.data.password);

        // userId: result[0].userId,
        // password: result[0].password 응답으로 받는다.
      })
      .catch((err: AxiosError) => {
        setErrorMessage("아이디와 인증번호를 입력하세요");
        console.log("아이디와 인증번호를 입력하세요", err);
      });
  };

  return (
    <div>
      {findPwd ? (
        <div>
          <div>
            <span>아이디</span>
            <input type="id" onChange={onUserInfo("userId")} placeholder="아이디를 입력해주세요" />
          </div>
          <div>
            <span>이메일</span>
            <input
              type="email"
              onChange={onUserInfo("email")}
              placeholder="이메일을 입력해주세요"
            />
            <button type="button" onClick={onClickFindAuth}>
              인증번호 받기
            </button>
          </div>
          <div>
            <span>인증번호</span>
            <input
              type="certNum"
              onChange={onUserInfo("certNum")}
              placeholder="인증번호 6자리 숫자 입력"
            />
          </div>

          <form>
            <button type="button" onClick={onClickFindPwd}>
              찾기
            </button>
            <div>{errorMessage}</div>
          </form>
        </div>
      ) : (
        <div>
          <span>비밀번호</span>
          <p>{userPwd}</p>
        </div>
      )}
    </div>
  );
};

export default Pwinquiry;
