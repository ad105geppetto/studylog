import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Pagenation } from "../components/Pagenation";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Nav from "components/Nav";
import { roomlist } from "action";
import { useDispatch } from "react-redux";

const Root = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  width: 80%;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  column-gap: 24px;
`;

const Post = styled.div`
  height: 300px;
  grid-column: span 4;
  display: flex;
  flex-direction: column;
  margin: 20px 0;
  border: 5px solid black;

  /* 반응형 만들어주는 코드 */
  /* 핸드폰일 경우 */
  @media only screen and (max-width: 500px) {
    grid-column: span 12;
  }
`;

const SERVER = process.env.REACT_APP_SERVER;

interface IPosts {
  id: number;
  title: string;
  entry: number;
  content: string;
}

interface socketInterface {
  socket: any;
  annoy: any;
  roomId: any;
  setRoomId: any;
}

const Roomlist = ({ socket, annoy, roomId, setRoomId }: socketInterface) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 여기서는 더미데이터, 실제로는 서버에서 받아오는 데이터
  const [posts, setPosts] = useState<IPosts[]>([]);
  // 페이지네이션에서 보여지는 페이지
  const [page, setPage] = useState<any>(1);
  // 한 페이지당 보여지는 목록의 갯수
  const [limit, setLimit] = useState(3);
  // 서버에서 받아오는 데이터의 총 갯수
  const [total, setTotal] = useState(0);

  const [search, setSearch] = useState("");

  // const [searchInfo, setSearchInfo] = useState({
  //   page: "",
  //   limit: "",
  //   title: "",
  // });

  // const [rooms, setRooms] = useState([]);

  const userInfo = useSelector((state: any) => state.userInfoReducer.userInfo);
  // const pageInfo = useSelector((state: any) => state.pageInfoReducer.pageInfo);

  useEffect(() => {
    // const getPageData = (page: number) => {
    //   return datas.slice(limit * page, limit * (page + 1));
    // };
    getPageData(page, limit);
  }, [page, limit]);

  // 새로고침을 해도 상태값 초기화가 되지 않게해보기.
  // 서버에서 공부방 데이터를 받아오는 함수--------
  const getPageData = (page: number, limit: number) => {
    axios
      .get(`${SERVER}/roomlist?page=${page}&limit=${limit}`, {
        headers: { authorization: `Bearer ${userInfo.accessToken}`, userId: userInfo.userId },
      })
      .then((res: AxiosResponse) => {
        // res.data.slice(limit * page, limit * (page + 1));
        setPosts(res.data.data);
        // const posts = setPosts(res.data.data);
        // dispatch(roomlist(posts));

        setTotal(res.data.total);
        console.log(res);
      })
      .catch((err: AxiosError) => {
        console.log("err:", err);
      });
  };

  // 화상대화방 만드는 함수
  const enterRoomHandler = (room: any) => {
    // 서버에서 받아온 방 id값
    setRoomId(room.Id);
    // 소켓에 이벤트 발생시키기
    socket.emit("enterRoom", room.id, userInfo.userId ? userInfo.userId : annoy);
    navigate(`/room/${room.id}`);
  };

  // 검색어를 띄워주는 함수-------
  const onSearch = () => {
    axios
      .get(`${SERVER}/search?title=${search}&limit=${limit}&page=${page}`)
      .then((res: AxiosResponse) => {
        setPosts(res.data.data);
        // const posts = setPosts(res.data.data);
        // dispatch(roomlist(posts));
        setTotal(res.data.total);
        console.log(res);
      })
      .catch((err: AxiosError) => {
        console.log(err);
      });
  };
  // const onSearch = () => {
  //   navigate("/search");
  // };

  // rooms가 의미하는 바를 정확하게 모르겠다
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <Root>
      <Nav />

      <input
        type="text"
        onChange={onChangeHandler}
        placeholder="검색어를 입력해주세요"
        autoComplete="off"
      />
      <button type="button" onClick={onSearch}>
        검색
      </button>

      <Container>
        {posts.length === 0
          ? "개설된 방이 없습니다"
          : posts.map((post: any, index: any): any => {
              return (
                <Post key={index} onClick={() => enterRoomHandler(post)}>
                  <div style={{ minWidth: "200px" }}>{post.title}</div>
                  <div style={{ flex: "1" }}>{post.entry}</div>
                  <div style={{ flex: "1" }}>{post.content}</div>
                </Post>
              );
            })}
      </Container>
      <select
        onChange={(e) => {
          setLimit(Number(e.target.value));
        }}
      >
        <option value={3}>3</option>
        <option value={6}>6</option>
        <option value={9}>9</option>
      </select>
      <Pagenation totalPage={Math.ceil(total / limit)} page={page} setPage={setPage} />
    </Root>
  );
};

export default Roomlist;
