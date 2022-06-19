import React, { useState } from "react";
// import Nav from "../components/Nav";
import axios, { AxiosError, AxiosResponse } from "axios";
import styled from "styled-components";

axios.defaults.withCredentials = true;
const SERVER = process.env.REACT_APP_SERVER || "http://localhost:4000";

const Idinquiry = () => {
  const [userEmail, setUserEmail] = useState("");

  const [userId, setUserId] = useState("");

  const [findId, setFindId] = useState(true);

  const [errorMessage, setErrorMessage] = useState("");

  const [id, setId] = useState(true);

  const onUserEmail = (e: any) => {
    setUserEmail(e.target.value);
  };

  // const onId = (e: any) => {
  //   setId(false);
  // };

  const onClickFindId = () => {
    axios
      .post(`${SERVER}/userid`, {
        email: userEmail,
      })
      .then((res: AxiosResponse) => {
        setFindId(false);
        console.log(res);
        setUserId(res.data.userId);
      })
      .catch((err: AxiosError) => {
        setErrorMessage("이메일을 입력하세요");
        console.log("이메일을 입력하세요", err);
      });
  };

  return (
    <Container>
      {findId ? (
        <Idbox
        // style={{
        //   height: "35vh",
        //   display: "flex",
        //   flexDirection: "column",
        //   // justifyContent: "center",
        //   // alignItems: "center",
        //   // background: "black",
        // }}
        >
          <div>
            <Input type="email" onChange={onUserEmail} placeholder="이메일를 입력해주세요" />
          </div>
          <div>{errorMessage ? errorMessage : null}</div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: "-5vh",
            }}
          >
            <Button className="find" type="button" onClick={onClickFindId}>
              찾기
            </Button>
          </div>
        </Idbox>
      ) : (
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
  /* display: grid;
  grid-template-columns: repeat(12, 1fr);
  column-gap: 24px; */
  /* margin: auto; */
  width: 60vw;
  height: 44vh;
  display: flex;
  justify-content: center;
  padding-top: 10vh;
  background-color: #f7f6f2;
  /* margin-bottom: 17vh; */
  /* background-color: black; */
  .find {
    min-width: 7vw;
    min-height: 5.5vh;
    /* line-height: 5.5vh; */
    border-radius: 1rem;
    display: inline-block;
    justify-content: center;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 700;
    outline: 0;
    /* border: 0; */
    border: 2px solid grey;
    text-align: center;
    background: white;
    margin-bottom: 5vh;
  }
`;

const Button = styled.button`
  /* min-width: 10vw;
  min-height: 5.5vh;
  border-radius: 1rem;
  display: inline-block;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 700;
  outline: 0;
  background: white;
  border: 2px solid grey;
  margin-bottom: 5vh; */
  /* line-height: 5.5vh; */
  /* margin-bottom: 20vh; */
`;

const Idbox = styled.div`
  /* /* .find { */
    /* height: 7vh;
    margin-top: 4vw;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 1rem; 

  font-size: 1rem;
  text-align: center;
  font-weight: bold; */
  /* margin-top: 5vh; */
  /* margin-bottom: 2vh; */
  }
`;

const Input = styled.input`
  width: 30vw;
  height: 10vh;
  font-size: 1rem;
  align-items: center;
  background-color: white;
  border: 0.2rem solid lightgrey;
  border-radius: 1vh;
  margin-bottom: 20vh;
`;

const FindId = styled.div`
  /* display: flex; */
  alignitems: center; */
  .fadein{
  font-size: medium;
  position: relative;
  overflow: hidden;
  animation: fadein 2s ease-in-out;


}


@keyframes fadein{
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: none;
  }

  .id {
  }
  .showId {
  }
`;

export default Idinquiry;
