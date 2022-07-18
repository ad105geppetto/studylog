import React, { useState } from "react";
import Idinquiry from "../components/Idinquiry";
import Pwinquiry from "../components/Pwinquiry";
import Nav from "components/Nav";
import styled from "styled-components";

const Root = styled.div`
  width: 100vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LinkContainer = styled.div`
  width: 60vw;
  height: 10vh;
  margin-top: 1vh;
`;

const Findbox = styled.div`
  height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10vh;
  cursor: pointer;
  margin-top: -1vh;

  .id {
    border: solid lightgrey;
    border: 1px dashed #f7f6f2;
    color: #f7f6f2;
  }
  .pwd {
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
  background-color: #4b6587;
  font-size: 1rem;
  font-weight: 700;
`;

const Findinfo = () => {
  const [renderingTarget, setRenderingTarget] = useState("id");
  // 아이디 찾기와 비밀번호 찾기를 상태로 구분해서 렌더링을 달리한다.

  // -----------------아이디 찾기, 비밀번호 찾기 나누는 버튼-----------------
  const onChangeRender = (key: string) => (e: React.MouseEvent<HTMLButtonElement>) => {
    setRenderingTarget(key);
  };
  // --------------------------------------------------------------------------

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
        </Findbox>
      </LinkContainer>
      {/* 아이디 찾기와 비밀번호 찾기 버튼에  상태값을 줘서 렌더링을 달리하는 부분*/}
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

export default Findinfo;
