import styled, { keyframes } from "styled-components";

export const Logo = styled.img`
  height: 20vh;
  width: 20vh;
`;

export const Wrapper = styled.div`
  margin-top: -5vh;
  width: 100vw;
  height: 80vh;
  display: flex;
  justify-content: space-between;
  flex-flow: column wrap;
  align-content: space-around;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  /* grid-template-columns: 1fr 1fr; */
  flex-flow: row wrap;
  justify-content: space-evenly;
`;

export const ButtonWrapper2 = styled(ButtonWrapper)`
  flex-flow: column;
  align-items: center;
`;

export const Title = styled.div`
  width: 25vw;
  height: 5.5vh;
  line-height: 5.5vh;
  font-size: 2vh;
  font-weight: bolder;
  text-align: center;
  align-items: center;
  color: white;
  border: 2px dashed white;
  border-radius: 1vh;
  margin-bottom: 5vh;
`;

export const Input = styled.input`
  width: 25vw;
  height: 5.5vh;
  font-size: 1rem;

  align-items: center;
  background-color: white;
  border: 0.2rem solid lightgrey;
  border-radius: 1vh;
`;

export const Hidden = styled.input`
  display: none;
`;

export const LoginInput = styled(Input)`
  margin-bottom: 3vh;
`;

// const fadeOut = keyframes`
//   from {
//     color: red;
//   }

//   to {
//    color : #4B6587;
//   }
// `;

export const ErrorMsg = styled.div`
  color: red;
  font-weight: bolder;
  font-size: 0.8rem;
  margin-top: 2vh;
  margin-bottom: 2vh;
`;

export const SuccessMsg = styled(ErrorMsg)`
  color: lightgreen;
`;

export const LoginErrorMsg = styled(ErrorMsg)`
  color: red;
  text-align: center;
  font-size: 1rem;
`;

export const ImageBoard = styled(Logo)`
  height: 15vh;
  width: 15vw;
  border: 0.2rem solid lightgrey;
  border-radius: 1rem;
  background-color: white;
  margin-bottom: 2vh;
`;

export const Div = styled.div`
  width: auto;
  align-items: center;
`;

//! 버튼
export const Button = styled.button`
  min-width: 7vw;
  min-height: 5.5vh;
  line-height: 5.5vh;
  border-radius: 1rem;
  display: inline-block;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 300;
  outline: 0;
  border: 0;

  &:active {
    position: relative;
    top: 1px;
  }
`;

export const Upload_Button = styled(Button)`
  margin-left: -9vw;
  margin-bottom: 1vw;
  border: 0.1rem solid red;
`;

export const Large_Button = styled(Button)`
  height: 5vh;
  width: 20vw;
  font-size: 1rem;
  text-align: center;
  font-weight: bold;
  margin-bottom: 2vh;
`;

export const Small_Button = styled(Button)`
  font-size: 1rem;
  text-align: center;
  font-weight: bold;
  margin-bottom: 2vh;
`;

//! 버튼

export const InnerButton = styled(Button)`
  all: unset;
  min-width: 5vw;
  line-height: 5.5vh;
  text-align: center;
  font-size: 135%;
  min-height: 5.5vh;
  margin-left: -6vw;
`;

export const Label = styled.label`
  font-size: 1rem;
  margin-left: -5vw;
  margin-top: -3vw;
  cursor: pointer;
`;
