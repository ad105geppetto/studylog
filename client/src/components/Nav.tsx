import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { logout } from "action";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Modal from "components/Modal";

const SERVER = process.env.REACT_APP_SERVER || "http://localhost:4000";

const Nav = () => {
  // 모달창을 보여줄지 말지를 정하는 상태
  const [viewModal, setViewModal] = useState(false);

  const userInfo = useSelector((state: any) => state.userInfoReducer.userInfo);
  // accessToken의 유무를 상태로 정한다.
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

  return (
    <Container>
      <Logobox onClick={() => navigate("/roomlist")}>
        <Logo alt="LOGO" src="asset/dark_logo.png" object-fit="cover" />
      </Logobox>
      <LinkContainer>
        <LinkBox onClick={() => navigate("/roomlist")}>
          <button type="button">공부방 목록</button>
          <Line></Line>
        </LinkBox>
        <LinkBox onClick={() => navigate("/todos")}>
          <button type="button">공부 기록</button>
          <Line></Line>
        </LinkBox>
        <LinkBox onClick={() => navigate("/Creatingroom")}>
          <button type="button">공부방 만들기</button>
        </LinkBox>
      </LinkContainer>
      {/* accessToken의 유무로 로그인&회원가입을 렌더링할지 
      로그아웃&내정보를 렌더링 할지 정해주는 삼항연산자 */}
      {!token ? (
        <Logobox>
          <Btn type="button" onClick={() => navigate("/login")}>
            로그인
          </Btn>
          <Btn type="button" onClick={() => navigate("/signup")}>
            회원가입
          </Btn>
        </Logobox>
      ) : (
        <Logobox>
          <Btn
            type="button"
            onClick={() => {
              setViewModal(true);
            }}
          >
            로그아웃
          </Btn>
          {viewModal && (
            <Modal
              modal={viewModal}
              setModal={setViewModal}
              width="300"
              height="250"
              element={
                <ModalContainer>
                  <div>로그아웃을 하시겠습니까?</div>
                  <br />
                  <Buttonbox>
                    <ModalLogOutBtn style={{ color: "white" }} type="button" onClick={onLogOutBtn}>
                      확인
                    </ModalLogOutBtn>
                    <ModalLogOutBtn
                      style={{ color: "white" }}
                      type="button"
                      onClick={() => setViewModal(false)}
                    >
                      취소
                    </ModalLogOutBtn>
                  </Buttonbox>
                </ModalContainer>
              }
            />
          )}

          <Btn type="button" onClick={() => navigate("/mypage")}>
            내정보
          </Btn>
        </Logobox>
      )}
      <hr></hr>
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
  button {
    font-size: 1.5rem;
  }
`;

const Line = styled.div`
  width: 1px;
  height: 5vh;
  border-right: 2px dashed #4b6587;
  position: absolute;
  top: 18px;
  right: -1px;
`;

const LinkBox = styled.div`
  position: relative;
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
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  background-color: white;
`;

const ModalContainer = styled.div`
  background: #f7f6f2;
`;

const Buttonbox = styled.div`
  display: flex;
  justify-content: center;
`;

const ModalLogOutBtn = styled.button`
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
