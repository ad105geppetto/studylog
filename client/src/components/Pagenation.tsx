import { useState } from "react";
import styled from "styled-components";

interface IProps {
  totalPage: number;
  page: number;
  setPage: (page: number) => void;
}

export const Pagenation = ({ totalPage, page, setPage }: IProps) => {
  const pages = [];
  for (let i = 1; i <= totalPage; i++) {
    pages.push(i);
  }

  const handlePage = (page: number) => {
    setPage(page);
  };

  return (
    <Container>
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
      {pages.map((p, index) => {
        return (
          <PageBtn
            key={index}
            style={page === p ? { background: "red" } : {}}
            onClick={() => handlePage(p)}
          >
            {p}
          </PageBtn>
        );
      })}
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
`;
