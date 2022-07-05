import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Menubar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 10vw;
  height: 70vh;
  margin: 5vh 7vw 0 7vw;
  border: 0.2rem dashed white;
  border-radius: 1vw;
`;

export const Content = styled.div`
  background-color: white;
  display: flex;
  min-height: 70vh;
  width: 70vw;
  margin: 5vh 7vw 0 0;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const TextButton = styled.button`
  all: unset;
  align-self: center;

  width: 100%;
  height: 100%;
  line-height: 100%;
  text-align: center;
  font-size: 2vh;
  font-weight: bold;
  color: white;

  cursor: pointer;

  /* outline: 0;
  border: 0; */
  &:active {
    position: relative;
    top: 1px;
  }
`;

export const Line = styled.hr`
  border: none;
  border-top: dotted white;
  width: 80%;
`;
