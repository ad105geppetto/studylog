import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Prelogin from "components/Prelogin";
import axios, { AxiosError, AxiosResponse } from "axios";
import styled from "styled-components";
import Nav from "components/Nav";

interface socketInterface {
  setRoomId: any;
}
const SERVER = process.env.REACT_APP_SERVER || "http://localhost:4000";

const Creatingroom = ({ setRoomId }: socketInterface) => {
  const [errMessage, setErrMessage] = useState("");

  const navigate = useNavigate();

  const userInfo = useSelector((state: any) => state.userInfoReducer.userInfo);
  // 공부방 이름을 상태로 둔 것
  const [title, setTitle] = useState("");
  // 공부방 설명을 상태로 둔 것
  const [content, setContent] = useState("");

  const [isLogin, setIsLogin] = useState(false);

  const titleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const contentHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };
  // 공부방 생성하는 함수-----------------------------------------------
  const createRoomHandler = () => {
    if (title.length === 0 || content.length === 0) {
      setErrMessage(() => "방제목과 내용을 입력해주세요");
      // alert("방제목과 내용을 입력해주세요");
      return;
    }
    axios
      .post(
        `${SERVER}/room`,
        { title: title, content: content },
        {
          headers: { authorization: `Bearer ${userInfo.accessToken}` },
        }
      )
      .then((res: AxiosResponse) => {
        setRoomId(res.data.id);
        navigate(`/room/${res.data.id}`);
      })
      .catch((err: AxiosError) => {
        setErrMessage(() => "방제목과 내용을 입력해주세요");
      });
  };
  //-------------------------------------------------------------------

  // 로그인 여부 체크
  const checkLoginState = () => {
    if (userInfo.accessToken) {
      setIsLogin(() => true);
    }
  };
  // ------------------------

  useEffect(() => {
    checkLoginState();
  }, []);

  return (
    <Root>
      <Nav />
      <Container>
        {isLogin ? (
          <div>
            <Label htmlFor="roomName">방제목</Label>
            <Input
              className="title"
              type="text"
              onChange={titleHandler}
              id="roomName"
              placeholder="생성할 방 제목을 입력해주세요"
            ></Input>

            <Label htmlFor="content">내용</Label>
            <Input
              className="content"
              type="text"
              onChange={contentHandler}
              id="content"
              placeholder="어떤 방인지 간단히 소개해주세요"
            ></Input>
            <div>{errMessage}</div>
            <Button className="create" onClick={createRoomHandler}>
              확인
            </Button>
          </div>
        ) : (
          <Prelogin color="white" />
        )}
      </Container>
    </Root>
  );
};

const Root = styled.div`
  width: 100vw;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  width: 50vw;
  /* display: grid; */
  /* grid-template-columns: repeat(12, 1fr); */
  display: flex;
  flex-direction: column;
  column-gap: 24px;
  padding-top: 10vh;
  margin-bottom: 13vh;
  .title {
    height: 10vh;
    margin-top: 1vw;
    margin-bottom: 3vh;
  }
  .content {
    height: 15vh;
    margin-top: 1vw;
    margin-bottom: 5vh;
  }

  .create {
    height: 7vh;
    margin-top: 4vw;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    margin: auto;
  }
`;

const Label = styled.label`
  width: 15vh;
  height: 7vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 1.7rem;
  color: white;
`;

const Input = styled.input`
  width: 50vw;
  height: 5.5vh;
  font-size: 1rem;
  align-items: center;
  background-color: white;
  border: 0.2rem solid lightgrey;
  border-radius: 1vh;
`;

const Button = styled.button`
  width: 12vw;
  height: 8vh;
  border: 2px solid black;
  border-radius: 10px;
  margin-top: 10px;
  margin-right: 10px;
  background-color: white;
  padding: 5px;
`;

export default Creatingroom;
