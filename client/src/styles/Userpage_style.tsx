import styled from "styled-components";

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(10, 100px);

  grid-template-areas:
    ". . . . . . . . . . . ."
    ". . . . Title Title Title Title . . . ."
    ". . . . . . . . . . . ."
    ". . . . Name Input Input Input Button . . ."
    ". . . . . . . . . . . ."
    ". . . . Name Input Input Input . . . ."
    ". . . . Name Input Input Input . . . ."
    ". . . . Name Input Input Input Button . . ."
    ". . . . . . . . . . . ."
    ". . . . . . Button Button  . . .";
  grid-column-gap: 20px;
`;

export const Input = styled.input`
  grid-area: Input;
`;
