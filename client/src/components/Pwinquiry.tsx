import React, { useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import styled from "styled-components";

const Container = styled.div`
  width: 60vw;
  height: 44vh;
  display: flex;
  justify-content: center;
  padding-top: 10vh;
  background-color: #f7f6f2;

  .cert {
    min-width: 7vw;
    min-height: 4.5vh;
    border: 0.2rem solid lightgrey;
    border-radius: 1rem;
    display: inline-block;
    align-items: center;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 400;
    outline: 0;
    background: white;
    margin-left: 1vw;
  }
  .find {
    min-width: 7vw;
    min-height: 5.5vh;
    line-height: 5.5vh;
    border-radius: 1rem;
    display: inline-block;
    justify-content: center;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 700;
    outline: 0;
    border: 2px solid grey;
    text-align: center;
    background: white;
  }
`;

const Input = styled.input`
  width: 30vw;
  height: 5vh;
  font-size: 1rem;
  align-items: center;
  background-color: white;
  border: 0.2rem solid lightgrey;
  border-radius: 1vh;
  margin-bottom: 5vh;
`;

const FindPwd = styled.div`
  display: "flex";
  justify-content: "center";
  align-items: "center";
  height: "70%";
  color: "#4b6587";
  font-size: "5vh";
`;

const Button = styled.button`
  &:active {
    position: relative;
    top: 1px;
  }
`;

const ErrMsg = styled.div`
  /* color: red;
  font-weight: bolder;
  text-align: center;
  font-size: 0.8rem;
  margin-top: -5vh;
  margin-bottom: 10vh; */
`;

axios.defaults.withCredentials = true;
const SERVER = process.env.REACT_APP_SERVER || "http://localhost:4000";

const Pwinquiry = () => {
  const [userInfo, setUserInfo] = useState({
    userId: "",
    email: "",
    certNum: "",
  });

  const [userPassword, setUserPassword] = useState("");
  const [findPwd, setFindPwd] = useState(true);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  // 인증번호 에러 메시지
  const [certErrorMessage, setCertErrorMessage] = useState("");

  const onUserInfo = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...userInfo, [key]: e.target.value });
  };
  // 인증번호 받기 함수------------------------------------------------------
  const onClickFindAuth = () => {
    axios
      .post(`${SERVER}/userpwd/auth`, {
        email: userInfo.email,
      })
      .then((res: AxiosResponse) => {
        // setFindPwd(false);
        // console.log(res);
        // setUserInfo(res.data.userInfo.certNum);
      })
      .catch((err: AxiosError) => {
        setCertErrorMessage("이메일을 입력하세요");
        console.log("이메일을 입력하세요", err);
      });
  };
  // ------------------------------------------------------------------------

  // 비밀번호 받기 함수------------------------------------------------------
  const onClickFindPwd = () => {
    axios
      .post(`${SERVER}/userpwd`, {
        userId: userInfo.userId,
        certNum: userInfo.certNum,
      })
      .then((res: AxiosResponse) => {
        setFindPwd(false);
        setUserPassword(res.data.password);
      })
      .catch((err: AxiosError) => {
        setPasswordErrorMessage("아이디와 인증번호를 입력하세요");
        console.log("아이디와 인증번호를 입력하세요", err);
      });
  };
  // ------------------------------------------------------------------------

  return (
    <Container>
      {/* findPwd 상태 값이 true면 비밀번로 찾기 화면이 렌더링 */}
      {findPwd ? (
        <div style={{ marginBottom: "5vh" }}>
          <div>
            <Input type="id" onChange={onUserInfo("userId")} placeholder="아이디를 입력해주세요" />
          </div>
          <div>
            <Input
              type="email"
              onChange={onUserInfo("email")}
              placeholder="이메일을 입력해주세요"
            />
            <Button className="cert" type="button" onClick={onClickFindAuth}>
              인증번호 받기
            </Button>
            <div>{certErrorMessage}</div>
          </div>
          <div>
            <Input
              type="certNum"
              onChange={onUserInfo("certNum")}
              placeholder="인증번호 6자리 숫자 입력"
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <ErrMsg>{passwordErrorMessage}</ErrMsg>
            <Button className="find" type="button" onClick={onClickFindPwd}>
              찾기
            </Button>
          </div>
        </div>
      ) : (
        // findPwd 상태 값이 false면 찾은 비밀번호를 렌더링해주기.
        <FindPwd className="showPwd fadein">비밀번호는 {userPassword} 입니다</FindPwd>
      )}
    </Container>
  );
};

export default Pwinquiry;
