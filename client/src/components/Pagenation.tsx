import styled from "styled-components";

const Container = styled.div`
  height: 5vh;
  display: flex;
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

interface IProps {
  totalPage: number;
  page: number;
  setPage: (page: number) => void;
}

const Pagenation = ({ totalPage, page, setPage }: IProps) => {
  const pages = [];
  for (let i = 1; i <= totalPage; i++) {
    pages.push(i);
  }

  const prePageHandler = () => {
    if (page === 1) {
      return;
    }
    setPage(page - 1);
  };

  const currentPageHandler = (currentPage: number) => {
    setPage(currentPage);
  };

  const nextPageHandler = () => {
    if (page === totalPage) {
      return;
    }
    setPage(page + 1);
  };

  return (
    <Container>
      {/* 이전페이지로 이동하기 */}
      <PageBtn onClick={prePageHandler}>{"<"}</PageBtn>
      {/* 현재 보여지는 페이지 */}
      {pages.map((currntPage, index) => {
        return (
          <PageBtn
            key={index}
            style={page === currntPage ? { background: " #F0E5CF", color: " black" } : {}}
            onClick={() => currentPageHandler(currntPage)}
          >
            {currntPage}
          </PageBtn>
        );
      })}
      {/* 다음 페이지로 이동하기 */}
      <PageBtn onClick={nextPageHandler}>{">"}</PageBtn>
    </Container>
  );
};

export default Pagenation;
