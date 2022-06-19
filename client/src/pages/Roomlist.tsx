import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Pagenation } from "../components/Pagenation";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Nav from "components/Nav";
import { roomlist } from "action";
import { useDispatch } from "react-redux";
import Modal from "components/Modal";

const Container = styled.div`
  width: 80%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  column-gap: 24px;
`;

const Root = styled.div`
  width: 100%;
  height: 65vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Post = styled.div`
  height: 25vh;
  grid-column: span 4;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 3vh 0 1vh 0;
  border: 2px dashed white;
  /* 위아래중에 가운데 플렉스 디렉션이 컬럼일 때*/
  justify-content: center;
  /* 스트링 값 센터 배치 */
  text-align: center;
  align-items: center;
  color: white;
  .title {
    margin-bottom: 5vh;
    font-size: 1rem;
  }

  div {
    width: 20vw;
    font-size: 1.1rem;
  }

  /* 반응형 만들어주는 코드 */
  /* 핸드폰 */
  @media only screen and (max-width: 500px) {
    grid-column: span 12;
  }
  /* 태블릿 */
  /* @media only screen and (max-width: 768px) {
    grid-column: span 12;
  } */
  /* PC */
  /* @media only screen and (max-width: 1200px) {
    grid-column: span 12;
  } */
`;

const Input = styled.input`
  z-index: 99;
`;

const Button = styled.button`
  z-index: 99;
`;

const BtnContainer = styled.div`
  background: #f7f6f2;
`;

const Buttonbox = styled.div`
  display: flex;
  justify-content: center;
`;

const EnterRoomBtn = styled.button`
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

interface IPosts {
  id: number;
  title: string;
  entry: number;
  content: string;
}

interface socketInterface {
  annoy: any;
  roomId: any;
  setRoomId: any;
}

const SERVER = process.env.REACT_APP_SERVER || "http://localhost:4000";

const Roomlist = ({ annoy, roomId, setRoomId }: socketInterface) => {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const [modal, setModal] = useState(false);

  // 실제로 서버에서 받아오는 데이터
  const [posts, setPosts] = useState<IPosts[]>([]);
  // 페이지네이션에서 보여지는 페이지
  const [page, setPage] = useState<any>(1);
  // 한 페이지당 보여지는 목록의 갯수
  const [limit, setLimit] = useState(6);
  // 서버에서 받아오는 데이터의 총 갯수
  const [totalPage, setTotalPage] = useState(0);

  const [search, setSearch] = useState("");

  // const [rooms, setRooms] = useState([]);

  const userInfo = useSelector((state: any) => state.userInfoReducer.userInfo);
  // const pageInfo = useSelector((state: any) => state.pageInfoReducer.pageInfo);

  useEffect(() => {
    getPageData(page, limit);
  }, [page, limit]);

  // 서버에서 공부방 데이터를 받아오는 함수----------------------------------
  const getPageData = (page: number, limit: number) => {
    axios
      .get(`${SERVER}/roomlist?page=${page}&limit=${limit}`, {
        headers: { authorization: `Bearer ${userInfo.accessToken}`, userId: userInfo.userId },
      })
      .then((res: AxiosResponse) => {
        setPosts(res.data.data);
        setTotalPage(res.data.total);
      })
      .catch((err: AxiosError) => {
        console.log("err:", err);
      });
  };
  // -----------------------------------------------------------------------

  // 화상대화방 들어가는 함수-----------------------------------------------
  const enterRoomHandler = (room: any) => {
    if (room.roomCurrent === 4) {
      alert("들어갈 수 있는 인원이 찼습니다.");
      return;
    }
    setRoomId(room.id);
    console.log(roomId);
    axios
      .patch(`${SERVER}/room`, {
        roomId: room.id,
        userId: userInfo.id,
        type: "plus",
      })

      .then((res) => {
        navigate(`/room/${room.id}`);
      });
  };
  // -----------------------------------------------------------------------

  // 검색어를 띄워주는 함수-------------------------------------------------
  // 검색후에 변수가 초기화가 되는 문제 확인해주세요
  const onSearch = () => {
    axios
      .get(`${SERVER}/search?title=${search}&limit=${limit}&page=${page}`)
      .then((res: AxiosResponse) => {
        setPosts(res.data.data);
        // posts를 리덕스에 저장하는 법
        // const posts = setPosts(res.data.data);
        // dispatch(roomlist(posts));
        setTotalPage(res.data.total);
        console.log(res);
      })
      .catch((err: AxiosError) => {
        console.log(err);
      });
  };
  // -----------------------------------------------------------------------

  // rooms가 의미하는 바를 정확하게 모르겠다

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Nav />
      {/* <Input
        type="text"
        onChange={onChangeHandler}
        placeholder="검색어를 입력해주세요"
        autoComplete="off"
      />
      <Button type="button" onClick={onSearch}>
        검색
      </Button> */}
      <Root>
        <Container>
          {posts.length === 0 ? (
            <div>개설된 방이 없습니다</div>
          ) : (
            posts.map((post: any, index: any): any => {
              return (
                <Post
                  key={index}
                  // onClick={() => {
                  //   setModal(true);
                  // }}
                  onClick={() => enterRoomHandler(post)}
                  style={{ backgroundColor: "" }}
                >
                  <div>
                    제목 : {post.title.length < 13 ? post.title : post.title.slice(0, 10) + "..."}
                  </div>
                  <br />
                  <div>
                    내용 :
                    {post.content.length < 13
                      ? " " + post.content
                      : " " + post.content.slice(0, 10) + "..."}
                  </div>
                  <br />
                  <div className="current">참여인원 : {post.roomCurrent} / 4</div>
                  <div className=""></div>
                </Post>
              );
            })
          )}
        </Container>
      </Root>

      {/* <select
        onChange={(e) => {
          setLimit(Number(e.target.value));
        }}
      >
        <option value={6}>6</option>
        <option value={3}>3</option>
        <option value={9}>9</option>
      </select> */}
      <Pagenation totalPage={totalPage} page={page} setPage={setPage} />
    </div>
  );
};

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

export default Roomlist;

// {modal && (
//   <Modal
//     enterRoomHandler={enterRoomHandler}
//     roomId={roomId}
//     modal={modal}
//     setModal={setModal}
//     width="300"
//     height="250"
//     element={
//       <BtnContainer>
//         <div>공부방에 입장 하시겠습니까?</div>
//         <br />
//         <Buttonbox>
//           <LogOutBtn
//             style={{ color: "white" }}
//             type="button"
//             onClick={() => enterRoomHandler(roomId)}
//           >
//             확인
//           </LogOutBtn>
//           <LogOutBtn
//             style={{ color: "white" }}
//             type="button"
//             // onClick={() => onModalOff(modal)}
//             onClick={() => setModal(false)}
//           >
//             취소
//           </LogOutBtn>
//         </Buttonbox>
//       </BtnContainer>
//     }
//   />
// )}
