import React, { useState } from "react";
import Idinquiry from "../components/Idinquiry";
import Pwinquiry from "../components/Pwinquiry";
import Nav from "components/Nav";
import axios, { AxiosError, AxiosResponse } from "axios";
import Modal from "../components/Modal";
import { useDispatch, useSelector } from "react-redux";
import { dropout } from "../action/index";

axios.defaults.withCredentials = true;
const SERVER = process.env.REACT_APP_SERVER;

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

      {/* <div className="im-container">
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
      </div> */}
    </div>
  );
};
export default Findinfo;
