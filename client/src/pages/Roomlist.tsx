import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Pagenation from "../components/Pagenation";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Nav from "components/Nav";
import Modal from "components/Modal";
import { roomlist } from "action";
import { useDispatch } from "react-redux";

const Container = styled.div`
  width: 80%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  column-gap: 24px;
  .noroom {
    width: 80vw;
    height: 60vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 3rem;
    margin-bottom: 5vh;
  }
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
  const [isLoading, setIsLoading] = useState(true);

  const [newRoom, setNewRoom] = useState({});

  const navigate = useNavigate();
  // 모달창을 보여줄지 말지를 정하는 상태
  const [viewModal, setViewModal] = useState(false);
  // 실제로 서버에서 받아오는 데이터
  const [posts, setPosts] = useState<IPosts[]>([]);
  // 페이지네이션에서 보여지는 페이지
  const [page, setPage] = useState<any>(1);
  // 한 페이지당 보여지는 목록의 갯수
  const [limit, setLimit] = useState(6);
  // 서버에서 받아오는 데이터의 총 갯수
  const [totalPage, setTotalPage] = useState(0);
  // input창에 검색하게 되는 검색어를 상태로 저장.
  const [search, setSearch] = useState("");

  const selectedRoom = useRef(null);

  const userInfo = useSelector((state: any) => state.userInfoReducer.userInfo);
  // const pageInfo = useSelector((state: any) => state.pageInfoReducer.pageInfo);

  useEffect(() => {
    // setTimeout(() => {
    //   getPageData(page, limit);
    // }, 1000);
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
        // console.log(res.data.data);
        setTotalPage(res.data.total);
        // setNewRoom(res.data.data[0]);
        setIsLoading(false);
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
    // console.log(roomId);
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

  // 검색어를 검색해주는 함수-------------------------------------------------
  const onSearch = () => {
    axios
      .get(`${SERVER}/search?title=${search}&limit=${limit}&page=${page}`)
      .then((res: AxiosResponse) => {
        setPosts(res.data.data);
        // posts를 리덕스에 저장하는 법
        // const posts = setPosts(res.data.data);
        // dispatch(roomlist(posts));
        setTotalPage(res.data.total);
      })
      .catch((err: AxiosError) => {
        console.log(err);
      });
  };
  // -----------------------------------------------------------------------

  const refresh = () => {
    getPageData(page, limit);
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Nav />
      {/* 검색부분은 에러를 수정하기 전까지 주석처리 */}
      <Input
        type="text"
        onChange={onChangeHandler}
        placeholder="검색어를 입력해주세요"
        autoComplete="off"
      />
      <Button type="button" onClick={onSearch}>
        검색
      </Button>
      <Button type="button" onClick={refresh}>
        새로고침
      </Button>

      {isLoading ? (
        // 로딩중일때에는 강아지 보여주기
        <Root>
          <img
            style={{ marginTop: "15vh", height: "35vh", width: "50vh" }}
            alt="studylog"
            src="asset/cat.gif"
          />
          <div style={{ color: "white", fontSize: "10vh" }}>Loading...</div>
        </Root>
      ) : (
        // 로딩이 끝나면 공부방 목록 보여주기
        <div>
          <Root>
            <Container className="container">
              {posts.length === 0 ? (
                <div
                  className="noroom"
                  style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
                >
                  <div>개설된 방이 없습니다</div>
                </div>
              ) : (
                posts.map((post: any, index: any): any => {
                  return (
                    <Post
                      key={index}
                      onClick={() => {
                        setViewModal(true);
                        selectedRoom.current = post;
                      }}
                    >
                      <div>
                        제목 :{" "}
                        {post.title.length < 13 ? post.title : post.title.slice(0, 10) + "..."}
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
            {viewModal && (
              <Modal
                modal={viewModal}
                setModal={setViewModal}
                width="300"
                height="250"
                element={
                  <BtnContainer>
                    <div style={{ fontSize: "1.5rem" }}>공부방에 입장 하시겠습니까?</div>
                    <br />
                    <Buttonbox>
                      <EnterRoomBtn
                        style={{ color: "white" }}
                        type="button"
                        onClick={() => enterRoomHandler(selectedRoom.current)}
                      >
                        확인
                      </EnterRoomBtn>
                      <EnterRoomBtn
                        style={{ color: "white" }}
                        type="button"
                        onClick={() => setViewModal(false)}
                      >
                        취소
                      </EnterRoomBtn>
                    </Buttonbox>
                  </BtnContainer>
                }
              />
            )}
          </Root>
          <Pagenation totalPage={totalPage} page={page} setPage={setPage} />
        </div>
      )}
      {/* 한 페이지에 몇개의 방을 보여줄지 정하기*/}
      {/* <select
        onChange={(e) => {
          setLimit(Number(e.target.value));
        }}
      >
        <option value={6}>6</option>
        <option value={3}>3</option>
        <option value={9}>9</option>
      </select> */}
    </div>
  );
};

export default Roomlist;
