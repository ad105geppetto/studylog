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
  margin-top: 2vw;
  display: inline-block;
  flex-direction: column;
  justify-content: space-between;
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
  border: 0.3rem dotted white;
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

const fadeOut = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
`;

export const ErrorMsg = styled.div`
  color: red;
  font-weight: bolder;
  font-size: 0.8rem;
  margin-top: 2vh;
  margin-bottom: 2vh;
`;

export const LoginErrorMsg = styled(ErrorMsg)`
  text-align: center;
  font-size: 1rem;
  animation: ${fadeOut} 2s linear;
`;

export const ImageBoard = styled(Logo)`
  height: 15vh;
  width: 25vw;
  padding-bottom: 1.2vw;
  border: 0.2rem solid red;
  border-radius: 1rem;
  background-color: white;
`;

export const Div = styled.div`
  width: auto;
  align-items: center;
`;

//! 버튼
export const Button = styled.button`
  width: 7vw;
  height: 5.5vh;
  line-height: 5.5vh;
  background: white;
  border-radius: 1rem;
  display: inline-block;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 300;
  margin-left: -7vw;
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
  width: 23vw;
  font-size: 1rem;
  text-align: center;
  font-weight: bold;
  margin-bottom: 2vh;
  margin-left: 0;
  align-items: center;
`;

export const Small_Button = styled(Button)`
  height: 5vh;
  width: 10vw;
  font-size: 1rem;
  align-self: baseline;
  text-align: center;
  font-weight: bold;
  margin-bottom: 2vh;
  margin-left: 0; ;
`;

//! 버튼

export const InnerButton = styled(Button)`
  min-width: 5vw;
  min-height: 5.5vh;
`;

export const LeftButton = styled(Button)`
  align-self: flex-start;
`;
