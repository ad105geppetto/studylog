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

const Root = styled.div`
  width: 100vw;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const Container = styled.div`
  display: flex;

  height: 60vh;
  width: 90vw;
  justify-content: center;
  flex-flow: row wrap;
  /* display: grid;
  grid-template-columns: repeat(12, 1fr);
  column-gap: 24px; */

  margin-bottom: 1vh;
  /* background-color: white; */
`;

const Post = styled.div`
  height: 25vh;
  width: 25vw;
  display: flex;
  flex-direction: column;
  margin: 3vh 1vh 1vh 1vh;
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
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);

  // 여기서는 더미데이터, 실제로는 서버에서 받아오는 데이터
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

  // 새로고침을 해도 상태값 초기화가 되지 않게해보기.
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
      alert("꽉참");
      return;
    }
    setRoomId(room.id);
    console.log(room.id);
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

  // const onModalOff = (modal: any) => {
  //   setModal((modal) => !modal);
  // };

  return (
    <div>
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
      <Root id="root">
        <Container>
          {posts.length === 0
            ? "개설된 방이 없습니다"
            : posts.map((post: any, index: any): any => {
                return (
                  // <Post key={index} onClick={() => enterRoomHandler(post)}>
                  <Post
                    key={index}
                    // onClick={() => {
                    //   setModal(true);
                    // }}

                    onClick={() => enterRoomHandler(post)}
                    // onClick에 () => setModal(modal)
                  >
                    <div className="title">제목 : {post.title}</div>
                    <div>참여인원 : {post.roomCurrent} / 4</div>
                    <div>내용 : {post.content}</div>
                  </Post>
                );
              })}
        </Container>

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
      </Root>
    </div>
  );
};

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

export default Roomlist;
