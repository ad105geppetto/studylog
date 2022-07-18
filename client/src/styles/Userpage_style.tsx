import styled from "styled-components";

export const Logo = styled.img`
  height: 20vh;
  width: 20vh;
`;

export const Wrapper = styled.div`
  margin-top: -7vh;

  box-sizing: border-box;
  width: 100%;
  height: 80vh;
  display: flex;
  justify-content: center;
  flex-flow: column;
  align-items: center;

  @media only screen and (max-width: 800px) {
    width: 100%;
    margin: 0;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
`;

export const ButtonWrapper2 = styled.div`
  display: flex;
  margin-top: 3vh;
  flex-flow: column;
  align-items: center;
`;

export const Title = styled.div`
  width: 25vw;
  height: 5.5vh;
  line-height: 5.5vh;
  font-size: 2rem;
  font-weight: bolder;
  text-align: center;
  align-items: center;
  color: white;
  border: 2px dashed white;
  border-radius: 1vh;
  margin-bottom: 5vh;

  @media only screen and (max-width: 800px) {
    width: 80%;
    margin-bottom: 1rem;
  }

  @media only screen and (max-width: 500px) {
    width: 100%;
    margin-bottom: 1rem;
  }
`;

export const Form = styled.form`
  box-sizing: content-box;
  width: 25vw;
  @media only screen and (max-width: 800px) {
    width: 80%;
    margin: 0;
  }

  @media only screen and (max-width: 500px) {
    width: 100%;
    margin: 0;
  }
`;

export const ImageSection = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column wrap;
  align-content: center;
`;

export const Separation = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column wrap;
  justify-content: space-betwee;
`;

export const SubTitle = styled.div`
  color: white;
  font-size: 1.5;
  align-self: center;
  align-items: center;
`;

export const Input = styled.input`
  width: 100%;
  box-sizing: border-box;
  height: 5.5vh;
  text-indent: 1vw;
  font-size: 1rem;
  align-items: center;
  background-color: white;

  border: 2px solid lightgrey;

  border-radius: 1vh;

  @media only screen and (max-width: 800px) {
    width: 100%;
    text-align: center;
    margin: 0;
  }
`;

export const ErrorMsg = styled.div`
  color: red;
  font-weight: bolder;
  text-align: center;
  font-size: 0.8rem;
  margin-top: 3vh;
  margin-bottom: 3vh;
`;

export const SuccessMsg = styled(ErrorMsg)`
  color: lightgreen;
`;

export const LoginErrorMsg = styled(ErrorMsg)`
  text-align: center;
  font-size: 1rem;
`;

export const ImageBoard = styled(Logo)`
  height: 15vh;
  width: 75%;
  border: 0.2rem solid lightgrey;
  border-radius: 1rem;
  background-color: white;
  margin-top: 2vh;
  align-self: flex-end;
`;

export const Button = styled.button`
  min-width: 12vw;
  height: 5.5vh;
  line-height: 5.5vh;
  border-radius: 1rem;
  display: inline-block;
  cursor: pointer;
  font-size: 1vim;
  font-weight: 300;
  outline: 0;
  border: 0;

  &:active {
    position: relative;
    top: 1px;
  }
`;

export const LargeButton = styled(Button)`
  display: flex;
  height: 5vh;
  width: 100%;
  font-size: 1rem;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-bottom: 2vh;
`;

export const SmallButton = styled(Button)`
  font-size: 1.7vh;
  text-align: center;
  font-weight: bold;
  margin-top: 2vh;

  @media only screen and (max-width: 800px) {
    width: 100%;
    text-align: center;
    margin-top: 2vh;
  }
`;

export const InnerButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  font-weight: bold;
  background-color: white;
  text-align: center;
  align-self: flex-end;
  font-size: rem;
  width: 50%;
  height: 3vh;
  margin-top: 1vh;
  font-size: 0.9rem;
  line-height: 3vh;
  border-radius: 1vh;

  @media only screen and (max-width: 800px) {
    width: 100%;
    text-align: center;
  }
`;
