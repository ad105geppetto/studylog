import React, { useState } from "react";
import Idinquiry from "../components/Idinquiry";
import Pwinquiry from "../components/Pwinquiry";
import Nav from "components/Nav";
import axios, { AxiosError, AxiosResponse } from "axios";
// import Modal from "../components/Modal";
import { useDispatch, useSelector } from "react-redux";
import { dropout } from "../action/index";
import styled from "styled-components";

axios.defaults.withCredentials = true;
const SERVER = process.env.REACT_APP_SERVER || "http://localhost:4000";

const Findinfo = () => {
  const [isLogedIn, setIsLogedIn] = useState(true);

  const dispatch = useDispatch();

  const userInfo = useSelector((state: any) => state.userInfoReducer.userInfo);

  const [renderingTarget, setRenderingTarget] = useState("id");

  const [modal, setModal] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const onDropOutlBtn = () => {
    axios
      .delete(`${SERVER}/dropout`, {
        headers: { authorization: `Bearer ${userInfo.accessToken}` },
      })
      .then((res: AxiosResponse) => {
        console.log(res.data);
        const accessToken = res.data.accessToken;
        dispatch(dropout(accessToken));
      })
      .catch((err: AxiosError) => console.log(err));
  };
  //// -----------------아이디 찾기, 비밀번호 찾기 나누는 버튼-----------------

  const onChangeRender = (key: string) => (e: React.MouseEvent<HTMLButtonElement>) => {
    setRenderingTarget(key);
  };
  // ----------------------------------

  interface StyleInterface {
    findId: any;
  }

  return (
    <Root>
      <Nav />
      <LinkContainer>
        <Findbox id="findbox">
          <Btn
            style={
              renderingTarget === "id"
                ? { backgroundColor: "#f7f6f2", color: "#4b6587", border: "1px dashed #4b6587" }
                : {}
            }
            className="id"
            type="button"
            onClick={onChangeRender("id")}
          >
            아이디 찾기
          </Btn>
          <Btn
            style={
              renderingTarget === "pwd"
                ? { backgroundColor: "#f7f6f2", color: "#4b6587", border: "1px dashed #4b6587" }
                : {}
            }
            className="pwd"
            type="button"
            onClick={onChangeRender("pwd")}
          >
            비밀번호 찾기
          </Btn>
          {/* <button onClick={onChangeRender("id")}> 아이디 찾기 </button> */}
          {/* <button onClick={onChangeRender("pwd")}> 비밀번호 찾기 </button> */}
        </Findbox>
      </LinkContainer>

      {renderingTarget === "id" ? (
        <Idinquiry />
      ) : renderingTarget === "pwd" ? (
        <Pwinquiry />
      ) : (
        <div></div>
      )}
    </Root>
  );
};

const Root = styled.div`
  width: 100vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* background-color: black; */
  /* button {
    width: 20vw;
    color: #4b6587;
    font-size: 1rem;
    font-weight: 700;
  } */
`;

const LinkContainer = styled.div`
  width: 60vw;
  height: 10vh;
  margin-top: 1vh;
`;

const Findbox = styled.div`
  height: 70vh;
  /* position: relative; */
  /* border-right: 1px dotted black; */
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10vh;
  /* flex: 1; */
  cursor: pointer;
  margin-top: -1vh;

  .id {
    /* background-color: #f7f6f2; */
    border: solid lightgrey;
    border: 1px dashed #f7f6f2;
    color: #f7f6f2;
  }
  .pwd {
    /* background: #4b6587; */
    border: 1px dashed #f7f6f2;
    color: #f7f6f2;
  }
`;

const Btn = styled.button`
  width: 30vw;
  height: 12vh;
  border: 1px solid grey;
  display: flex;
  justify-content: center;
  align-items: center;
  /* margin-right: 10px; */
  /* background-color: white; */
  /* padding: 10px 10px; */
  background-color: #4b6587;
  /* color: #4b6587; */
  font-size: 1rem;
  font-weight: 700;
`;

export default Findinfo;

{
  /* <div className="im-container">
        <div className="im-wrapper">
          <button
            onClick={() => {
              setModal(true);
            }}
          >
            회원탈퇴
          </button>
        </div>
        {modal && (
          <Modal
            modal={modal}
            setModal={setModal}
            width="250"
            height="200"
            element={
              <div>
                회원탈퇴를 하시겠습니까?
                <br />
                <button type="button" onClick={onDropOutlBtn}>
                  확인
                </button>
                <button type="button">취소</button>
              </div>
            }
          />
        )}
      </div> */
}
