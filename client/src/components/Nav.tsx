import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { logout } from "action";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

// const StyleNav = styled.div`
//   background-color: #f1f196;

//   width: 100vw;
//   height: 15vh;
// `;

const SERVER = process.env.REACT_APP_SERVER || "http://localhost:4000";

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
        navigate("/roomlist");
        // 새로고침하는 코드
        window.location.reload();
      })
      .catch((err: AxiosError) => console.log(err));
  };

  return (
    <Container>
      <Logobox onClick={() => navigate("/roomlist")}>
        <Logo alt="LOGO" src="asset/dark_logo.png" object-fit="cover" />
      </Logobox>
      <LinkContainer>
        <LinkBox onClick={() => navigate("/roomlist")}>
          <button type="button">Study List</button>
          <Line></Line>
        </LinkBox>
        <LinkBox onClick={() => navigate("/todos")}>
          <button type="button">Study Log</button>
          <Line></Line>
        </LinkBox>
        <LinkBox onClick={() => navigate("/Creatingroom")}>
          <button type="button">방 만들기</button>
        </LinkBox>
      </LinkContainer>
      {!token ? (
        <Logobox>
          <Btn type="button" onClick={() => navigate("/login")}>
            {/* <button type="button" onClick={() => navigate("/login")}> */}
            {/* 로그인 */}
            {/* </button> */}
            로그인
          </Btn>
          <Btn type="button" onClick={() => navigate("/signup")}>
            {/* <button type="button" onClick={() => navigate("/signup")}>
              회원가입
            </button> */}
            회원가입
          </Btn>
        </Logobox>
      ) : (
        <Logobox>
          <Btn type="button" onClick={onLogOutBtn}>
            로그아웃
          </Btn>

          <Btn type="button" onClick={() => navigate("/mypage")}>
            내정보
          </Btn>
        </Logobox>
      )}
      <hr />
    </Container>
  );
};

const Container = styled.div`
  /* 상단에 네비바를 고정하는 방법 */
  /* position: ab; */
  top: 0;
  /* ---------------------------------------------------------------- */
  width: 100%;
  height: 17vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #f0e5cf;
  button {
    color: #4b6587;
    font-size: 1rem;
    font-weight: 700;
    cursor: pointer;
  }
`;

const Logo = styled.img`
  height: 17vh;
  width: 17vh;
`;

const LinkContainer = styled.div`
  width: 50vw;
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px dashed #4b6587;
  /* background-color: yellow; */
`;

const Line = styled.div`
  width: 1px;
  height: 5vh;
  /* color: pink; */
  border-right: 1px dashed #4b6587;
  position: absolute;
  top: 18px;
  right: -1px;
`;

const LinkBox = styled.div`
  position: relative;
  /* border-right: 1px dotted black; */
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  flex: 1;
  cursor: pointer;
  button {
    background: none;
    border: none;
  }
`;

const Logobox = styled.div`
  width: 20vw;
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 3%;
`;

const Btn = styled.button`
  width: 15vw;
  height: 6vh;
  border: 1px solid grey;
  border-radius: 10px;
  /* cursor: pointer; */
  display: flex;
  justify-content: center;

  align-items: center;
  margin-right: 10px;
  background-color: white;
  /* padding: 10px 10px; */
`;

export default Nav;

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

// </span>
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
