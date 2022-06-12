import React, { useState } from "react";
import Nav from "../components/Nav";
import axios, { AxiosError, AxiosResponse } from "axios";

axios.defaults.withCredentials = true;
const SERVER = process.env.REACT_APP_SERVER;

const Idinquiry = () => {
  const [userEmail, setUserEmail] = useState("");

  const [userId, setUserId] = useState("");

  const [findId, setFindId] = useState(true);

  const [errorMessage, setErrorMessage] = useState("");

  const [id, setId] = useState(true);

  const onUserEmail = (e: any) => {
    setUserEmail(e.target.value);
  };

  const onId = (e: any) => {
    setId(false);
  };

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
    <div>
      {findId ? (
        <div>
          <div>
            <span>이메일</span>
            <input type="email" onChange={onUserEmail} placeholder="이메일를 입력해주세요" />
          </div>
          <div>{errorMessage ? errorMessage : null}</div>

          <form>
            <button type="button" onClick={onClickFindId}>
              찾기
            </button>
          </form>
        </div>
      ) : (
        <div>
          <span>아이디</span>
          <div>{userId}</div>
        </div>
      )}
    </div>
  );
};

export default Idinquiry;
