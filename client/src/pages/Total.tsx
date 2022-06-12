import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Pagenation } from "../components/Pagenation";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useSelector } from "react-redux";

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

const datas = [
  {
    id: 0,
    title: "asd",
    content: "1",
  },
  {
    id: 1,
    title: "asdasd",
    content: "2",
  },
  {
    id: 2,
    title: "asqdsfd",
    content: "3",
  },
  {
    id: 3,
    title: "asqsqsdd",
    content: "4",
  },
  {
    id: 4,
    title: "asd123",
    content: "5",
  },
  {
    id: 5,
    title: "as14d",
    content: "6",
  },
  {
    id: 6,
    title: "asadsgd",
    content: "7",
  },
  {
    id: 7,
    title: "asdafs",
    content: "8",
  },
  {
    id: 8,
    title: "asadsd",
    content: "9",
  },
  {
    id: 9,
    title: "as1rwd",
    content: "0",
  },
  {
    id: 0,
    title: "asd",
    content: "1",
  },
  {
    id: 1,
    title: "asdasd",
    content: "2",
  },
  {
    id: 2,
    title: "asqdsfd",
    content: "3",
  },
  {
    id: 3,
    title: "asqsqsdd",
    content: "4",
  },
  {
    id: 4,
    title: "asd123",
    content: "5",
  },
  {
    id: 5,
    title: "as14d",
    content: "6",
  },
  {
    id: 6,
    title: "asadsgd",
    content: "7",
  },
  {
    id: 7,
    title: "asdafs",
    content: "8",
  },
  {
    id: 8,
    title: "asadsd",
    content: "9",
  },
  {
    id: 9,
    title: "as1rwd",
    content: "0",
  },
  {
    id: 0,
    title: "asd",
    content: "1",
  },
  {
    id: 1,
    title: "asdasd",
    content: "2",
  },
  {
    id: 2,
    title: "asqdsfd",
    content: "3",
  },
  {
    id: 3,
    title: "asqsqsdd",
    content: "4",
  },
  {
    id: 4,
    title: "asd123",
    content: "5",
  },
  {
    id: 5,
    title: "as14d",
    content: "6",
  },
  {
    id: 6,
    title: "asadsgd",
    content: "7",
  },
  {
    id: 7,
    title: "asdafs",
    content: "8",
  },
  {
    id: 8,
    title: "asadsd",
    content: "9",
  },
  {
    id: 9,
    title: "as1rwd",
    content: "0",
  },
];

interface IPosts {
  id: number;
  title: string;
}
const SERVER = process.env.REACT_APP_SERVER;

function Total() {
  // 여기서는 더미데이터, 실제로는 서버에서 받아오는 데이터
  const [posts, setPosts] = useState<IPosts[]>([]);
  const [page, setPage] = useState<any>(1);
  // 한 페이지당 보여지는 목록의 갯수
  const [limit, setLimit] = useState(3);
  const [total, setTotal] = useState(0);
  const userInfo = useSelector((state: any) => state.userInfoReducer.userInfo);

  useEffect(() => {
    // const getPageData = (page: number) => {
    //   return datas.slice(limit * page, limit * (page + 1));
    // };

    getPageData(page, limit);
  }, [page, limit]);

  const getPageData = (page: number, limit: number) => {
    axios
      .get(`${SERVER}/roomlist?page=${page}&limit=${limit}`, {
        headers: { authorization: `Bearer ${userInfo.accessToken}`, userId: userInfo.userId },
      })
      .then((res: AxiosResponse) => {
        // res.data.slice(limit * page, limit * (page + 1));
        setPosts(res.data.data);
        setTotal(res.data.total);
        console.log(res);
      })
      .catch((err: AxiosError) => {
        console.log("err:", err);
      });
  };

  // const handlePage = (page: number) => {
  //   setPage(page - 1);
  // };

  return (
    <Root>
      <Container>
        {posts.map((post, index) => {
          return (
            <Post key={index}>
              <div style={{ minWidth: "200px" }}>{post.id}</div>
              <div style={{ flex: "1" }}>{post.title}</div>
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
}

export default Total;
