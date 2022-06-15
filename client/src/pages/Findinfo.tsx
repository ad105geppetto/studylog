import React, { useState } from "react";
import Idinquiry from "../components/Idinquiry";
import Pwinquiry from "../components/Pwinquiry";
import Nav from "components/Nav";
import axios, { AxiosError, AxiosResponse } from "axios";
import Modal from "../components/Modal";
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

  return (
    <Root>
      <Nav />
      <LinkContainer>
        <Findbox>
          <button onClick={onChangeRender("id")}> 아이디 찾기 </button>
          <button onClick={onChangeRender("pwd")}> 비밀번호 찾기 </button>
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
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* background-color: black; */
  button {
    width: 20vw;
    color: #4b6587;
    font-size: 1rem;
    font-weight: 700;
  }
`;

const LinkContainer = styled.div`
  width: 60vw;
  height: 10vh;
  /* display: flex;
  justify-content: center;
  align-items: center; */
  border: 2px dashed #4b6587;
  background: black;
`;

const Findbox = styled.div`
  /* position: relative; */
  /* border-right: 1px dotted black; */
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10vh;
  flex: 1;
  cursor: pointer;
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
