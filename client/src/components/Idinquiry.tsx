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
        <Idbox style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div>
            <Input type="email" onChange={onUserEmail} placeholder="이메일를 입력해주세요" />
          </div>
          <div>{errorMessage ? errorMessage : null}</div>

          <div>
            <Button
              style={{ margin: "-50vh" }}
              className="find"
              type="button"
              onClick={onClickFindId}
            >
              찾기
            </Button>
          </div>
        </Idbox>
      ) : (
        <div>
          <span className="Id">아이디</span>
          <div className="shiwId">{userId}</div>
        </div>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 60vw;
  height: 44vh;
  /* display: grid;
  grid-template-columns: repeat(12, 1fr);
  column-gap: 24px; */
  padding-top: 10vh;
  margin: auto;
  background-color: #f7f6f2;
  margin-bottom: 17vh;
  /* background-color: black; */
`;

const Button = styled.button`
  min-width: 10vw;
  min-height: 5.5vh;
  /* line-height: 5.5vh; */
  border-radius: 1rem;
  display: inline-block;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 700;
  outline: 0;
  background: white;
  /* margin-bottom: 20vh; */
  border: 2px solid grey;
`;

const Idbox = styled.div`
  /* .find {
    height: 7vh;
    margin-top: 4vw;
    display: flex;
    justify-content: center;
    align-items: center;
    align-items: center;
    font-size: 1.5rem;
    margin: auto;
    border-radius: 1rem; */
  font-size: 1rem;
  text-align: center;
  font-weight: bold;
  /* margin-top: 5vh; */
  /* margin-bottom: 2vh; */
<<<<<<< HEAD
  }
=======
>>>>>>> 2dfed24cf41c42d56a237f57a6d0fa764d8ab43a
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
export default Idinquiry;
