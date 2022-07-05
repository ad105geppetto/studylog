import { useState } from "react";
import styled from "styled-components";

interface IProps {
  totalPage: number;
  page: number;
  setPage: (page: number) => void;
}

const Pagenation = ({ totalPage, page, setPage }: IProps) => {
  //전체페이지를 서버에서 받아와서 페이지에 push로 넣어준다
  const pages = [];
  for (let i = 1; i <= totalPage; i++) {
    pages.push(i);
  }

  const handlePage = (page: number) => {
    setPage(page);
  };

  return (
    <Container>
      {/* 이전페이지로 이동하기 */}
      <PageBtn
        onClick={() => {
          if (page === 1) {
            return;
          }
          handlePage(page - 1);
        }}
      >
        {"<"}
      </PageBtn>
      {/* 현재 보여지는 페이지 */}
      {pages.map((p, index) => {
        return (
          <PageBtn
            key={index}
            style={page === p ? { background: " #F0E5CF", color: " black" } : {}}
            onClick={() => handlePage(p)}
          >
            {p}
          </PageBtn>
        );
      })}
      {/* 다음 페이지로 이동하기 */}
      <PageBtn
        onClick={() => {
          if (page === totalPage) {
            return;
          }
          handlePage(page + 1);
        }}
      >
        {">"}
      </PageBtn>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  margin: 15px;
  justify-content: center;
  align-items: center;
  grid-column: span 12;
`;

const PageBtn = styled.div`
  width: 40px;
  height: 40px;
  margin: 10px;
  display: flex;
  border: 1px solid black;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: white;
  font-size: 0.7rem;
  font-weight: 600;
`;
export default Pagenation;
