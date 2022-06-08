import React, { useState } from "react";
import Idinquiry from "../components/Idinquiry";
import Pwinquiry from "../components/Pwinquiry";
import Nav from "components/Nav";
import axios, { AxiosError, AxiosResponse } from "axios";

axios.defaults.withCredentials = true;
const SERVER = process.env.REACT_APP_SERVER;

const Change = () => {
  const [renderingTarget, setRenderingTarget] = useState("id");
  const [userEmail, setUserEmail] = useState("");

  const [userId, setUserId] = useState("");
  const [userPwd, setUserPwd] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const [userInfo, setUserInfo] = useState({
    userId: "",
    email: "",
    certNum: "",
  });
  //// -----------------아이디 찾기, 비밀번호 찾기 나누는 버튼-----------------

  const onChangeRender = (key: string) => (e: React.MouseEvent<HTMLButtonElement>) => {
    setRenderingTarget(key);
  };
  // ----------------------------------

  // -----------------아이디 찾기 버튼-----------------
  const onClickFindId = () => {
    axios
      .post(`${SERVER}/userid`, {
        email: userEmail,
      })
      .then((res: AxiosResponse) => {
        console.log(res);
        setUserId(res.data.userId);
      })
      .catch((err: AxiosError) => {
        setErrorMessage("이메일을 입력하세요");
        console.log("이메일을 입력하세요", err);
      });
  };
  // ----------------------------------

  // -----------------비밀번호 찾기 버튼-----------------

  const onClickFindPwd = () => {
    axios
      .post(`${SERVER}/userpwd`, {
        userId: userInfo.userId,
        certNum: userInfo.certNum,
      })
      .then((res: AxiosResponse) => {
        console.log(res);
        setUserPwd(res.data.result[0].password);
      })
      .catch((err: AxiosError) => {
        setErrorMessage("아이디와 인증번호를 입력하세요");
        console.log("아이디와 인증번호를 입력하세요", err);
      });
    // ----------------------------------
  };
  return (
    <div>
      <Nav />

      <button onClick={onChangeRender("id")}> 아이디 찾기 </button>
      <button onClick={onChangeRender("pwd")}> 비밀번호 찾기 </button>

      {renderingTarget === "id" ? (
        <Idinquiry />
      ) : renderingTarget === "pwd" ? (
        <Pwinquiry />
      ) : (
        <div></div>
      )}
    </div>
  );
};
export default Change;
