import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { logout } from "action";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Modal from "components/Modal";

// const StyleNav = styled.div`
//   background-color: #f1f196;

//   width: 100vw;
//   height: 15vh;
// `;

const SERVER = process.env.REACT_APP_SERVER || "http://localhost:4000";

const Nav = () => {
  const [modal, setModal] = useState(false);

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

  // 로그아웃 함수--------------------------------------------------------
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
  // -------------------------------------------------------------------

  const onModalOff = (modal: any) => {
    setModal((modal) => !modal);
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
          <Btn
            type="button"
            onClick={() => {
              setModal(true);
            }}
          >
            로그아웃
          </Btn>
          {modal && (
            <Modal
              modal={modal}
              setModal={setModal}
              width="300"
              height="250"
              element={
                <BtnContainer>
                  <div>로그아웃을 하시겠습니까?</div>
                  <br />
                  <Buttonbox>
                    <LogOutBtn style={{ color: "white" }} type="button" onClick={onLogOutBtn}>
                      확인
                    </LogOutBtn>
                    <LogOutBtn
                      style={{ color: "white" }}
                      type="button"
                      onClick={() => onModalOff(modal)}
                    >
                      취소
                    </LogOutBtn>
                  </Buttonbox>
                </BtnContainer>
              }
            />
          )}

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
  position: relative;

  top: -0.5vw;
  bottom: 0.5vw;
  width: 100vw;
  height: 20vh;
  display: flex;
  justify-content: center;

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

const BtnContainer = styled.div`
  background: #f7f6f2;
`;

const Buttonbox = styled.div`
  display: flex;
  justify-content: center;
`;

const LogOutBtn = styled.button`
  font-size: 1rem;
  text-align: center;
  font-weight: 500;

  min-width: 6vw;
  min-height: 5vh;
  border-radius: 1rem;
  display: inline-block;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 700;
  outline: 0;
  background: #4b6587;
  color: white;
  border: 1px solid #f7f6f2;
  margin: 1vh;
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
