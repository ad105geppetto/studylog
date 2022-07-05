import React, { useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import styled from "styled-components";

axios.defaults.withCredentials = true;
const SERVER = process.env.REACT_APP_SERVER || "http://localhost:4000";

const Idinquiry = () => {
  const [userEmail, setUserEmail] = useState("");
  // 아이디를 찾고 상태로 저장한다.
  const [userId, setUserId] = useState("");

  const [findId, setFindId] = useState(true);
  // 아이디 찾는 함수 에러메시지
  const [errorMessage, setErrorMessage] = useState("");

  const onUserEmail = (e: any) => {
    setUserEmail(e.target.value);
  };
  // 이메일을 입력하고 아이디를 찾는 함수------------------------------
  const onClickFindId = () => {
    axios
      .post(`${SERVER}/userid`, {
        email: userEmail,
      })
      .then((res: AxiosResponse) => {
        setFindId(false);
        // console.log(res);
        setUserId(res.data.userId);
      })
      .catch((err: AxiosError) => {
        setErrorMessage("이메일을 입력하세요");
        console.log("이메일을 입력하세요", err);
      });
  };
  // -----------------------------------------------------------------

  return (
    <Container>
      {findId ? (
        // 아이디를 찾기 전 상태면 이메일 입력하는 창과 찾기 버튼 렌더링
        <div>
          <div>
            <Input type="email" onChange={onUserEmail} placeholder="이메일를 입력해주세요" />
          </div>
          <div>{errorMessage ? errorMessage : null}</div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: "5vh",
              height: "30vh",
            }}
          >
            <Button className="find" type="button" onClick={onClickFindId}>
              찾기
            </Button>
          </div>
        </div>
      ) : (
        // 아이디를 찾은 상태면 아이디 렌더링 해주기
        <FindId
          className="showId fadein"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "70%",
            color: "#4b6587",
            fontSize: "5vh",
          }}
        >
          아이디는 {userId} 입니다
        </FindId>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 60vw;
  height: 44vh;
  display: flex;
  justify-content: center;
  padding-top: 10vh;
  background-color: #f7f6f2;
`;

const Button = styled.button`
  min-width: 7vw;
  min-height: 5.5vh;
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
  margin-bottom: 10vh;
`;

const Input = styled.input`
  width: 30vw;
  height: 10vh;
  font-size: 1rem;
  align-items: center;
  background-color: white;
  border: 0.2rem solid lightgrey;
  border-radius: 1vh;
  margin-bottom: 13vh;
`;

const FindId = styled.div`
  .fadein {
    font-size: medium;
    position: relative;
    overflow: hidden;
    animation: fadein 2s ease-in-out;
  }
`;

export default Idinquiry;
