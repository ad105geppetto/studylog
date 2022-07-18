import Chart from "components/Chart";
import Boards from "components/Boards";
import { useSelector } from "react-redux";
import Prelogin from "components/Prelogin";
import Nav from "components/Nav";
import { Wrapper, Menubar, Content, TextButton, Line } from "styles/Todo_style";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

const Page = styled.div`
  width: 100vw;
  height: 100vh;
`;

const Todo = () => {
  const userInfo = useSelector((state: any) => state.userInfoReducer.userInfo);
  const [isLogin, setIsLogin] = useState(false);
  const [rendering, setRendering] = useState("Board");

  // ---- Todo 페이지 렌더링을 위한 상태값 변경 함수 ----
  const onRenderTodo = (e: React.MouseEvent<HTMLButtonElement>) => {
    setRendering((rendering) => "Board");
  }; // -------------------------------------------

  // ---- Chart 페이지 렌더링을 위한 상태값 변경 함수 ----
  const onRenderChart = (e: React.MouseEvent<HTMLButtonElement>) => {
    setRendering((rendering) => "Chart");
  };
  // -------------------------------------------

  // 로그인 여부 체크
  const checkLoginState = useCallback(() => {
    if (userInfo.accessToken) {
      setIsLogin(() => true);
    }
  }, [userInfo.accessToken]);
  // ------------------------

  useEffect(() => {
    checkLoginState();
  }, [checkLoginState]);

  return (
    <Page>
      <Nav />
      <Wrapper>
        <Menubar>
          <TextButton type="button" onClick={onRenderTodo}>
            할 일
          </TextButton>
          <Line />
          <TextButton as="button" id="static" type="button" onClick={onRenderChart}>
            공부시간
          </TextButton>
        </Menubar>
        <Content>
          {isLogin ? (
            rendering === "Board" ? (
              <Boards userInfo={userInfo} />
            ) : (
              <Chart userInfo={userInfo} />
            )
          ) : (
            <Prelogin color="black" />
          )}
        </Content>
      </Wrapper>
    </Page>
  );
};

export default Todo;
