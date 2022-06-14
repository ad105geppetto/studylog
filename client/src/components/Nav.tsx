import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { logout } from "action";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

const SERVER = process.env.REACT_APP_SERVER;

const Nav = () => {
  const userInfo = useSelector((state: any) => state.userInfoReducer.userInfo);

  // console.log(userInfo.accessToken);

  const [token, setToken] = useState(userInfo.accessToken);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onNavigate = (url: string) => {
    return (e: React.MouseEvent<HTMLButtonElement>) => {
      navigate(url);
    };
  };

  const onLogOutBtn = () => {
    axios
      .get(`${SERVER}/logout`, {
        headers: { authorization: `Bearer ${userInfo.accessToken}` },
      })
      .then((res: AxiosResponse) => {
        console.log(res.data);

        const accessToken = res.data.accessToken;
        dispatch(logout(accessToken));
        navigate("/");
        // 새로고침하는 코드
        window.location.reload();
      })
      .catch((err: AxiosError) => console.log(err));
  };

  return (
    <Container>
      <Logobox>로고</Logobox>
      <LinkContainer>
        <LinkBox>1</LinkBox>
        <LinkBox>2</LinkBox>
        <LinkBox style={{ border: "0px" }}>3</LinkBox>
      </LinkContainer>
      <Logobox>
        <Btn>로그인</Btn>
        <Btn>내정보</Btn>
      </Logobox>
    </Container>
  );

  // return (
  //   <div>
  //     <nav>
  //       <ul>
  //         <span>The Nav </span>
  //         <span>
  //           <button type="button" onClick={() => navigate("/roomlist")}>
  //             Study List
  //           </button>
  //         </span>
  //         <span>
  //           <button type="button" onClick={onNavigate("/todos")}>
  //             Study Log
  //           </button>
  //         </span>
  //         <span>
  //           <button type="button" onClick={() => navigate("/Creatingroom")}>
  //             방 만들기
  //           </button>
  //         </span>
  //         {!token ? (
  //           <span>
  //             <span>
  //               <button type="button" onClick={() => navigate("/login")}>
  //                 로그인
  //               </button>
  //             </span>
  //             <span>
  //               <button type="button" onClick={() => navigate("/signup")}>
  //                 회원가입
  //               </button>
  //             </span>
  //           </span>
  //         ) : (
  //           <span>
  //             <span>
  //               <button type="button" onClick={onLogOutBtn}>
  //                 로그아웃
  //               </button>
  //             </span>
  //             <span>
  //               <button type="button" onClick={() => navigate("/mypage")}>
  //                 내정보
  //               </button>
  //             </span>
  //           </span>
  //         )}
  //       </ul>
  //     </nav>
  //   </div>
  // );
};

const Container = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #f0e5cf;
`;

const Logobox = styled.div`
  width: 200px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LinkContainer = styled.div`
  width: 600px;
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px dotted black;
`;

const Btn = styled.div`
  width: 80px;
  height: 50px;
  border: 1px solid black;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
`;

const LinkBox = styled.div`
  border-right: 1px dotted black;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50%;
  flex: 1;
`;

export default Nav;
