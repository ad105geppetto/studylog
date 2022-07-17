import styled from "styled-components";
import { Dispatch, SetStateAction } from "react";

interface Props {
  width: string;
  height: string;
  element: JSX.Element;
  modal: boolean;
  setModal: Dispatch<SetStateAction<boolean>>;
}

// 모달창 View 부분
const View = styled.div<{ width: string; height: string }>`
  @keyframes switchModalOn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  left: calc(48.9vw - ${(props) => props.width}px / 2);
  top: calc(45vh - ${(props) => props.height}px / 2);
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  padding: 8px;
  background-color: #f7f6f2;
  border-radius: 5vh;
  border: 2vh solid lightgrey;
  animation-name: switchModalOn;
  animation-duration: 0.5s;
  z-index: 2000;
  font-size: 25px;
  font-weight: 700;
  color: grey;
  .exit-wrapper {
    position: absolute;
    top: 4px;
    right: 4px;
    font-size: 32px;
    width: 32px;
    height: 32px;
    line-height: 26px;
    background-color: transparent;
    cursor: pointer;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

// 모달창 팝업시 외부 접근방지 배경
const Canvas = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 53;
  animation-name: switchModalOn;
  animation-duration: 1s;
`;

const Modal = ({ width, height, element, modal, setModal }: Props) => {
  const modalOff = () => {
    setModal(false);
  };

  return (
    <>
      <View width={width} height={height}>
        <div className="exit-wrapper">&times;</div>
        <Wrapper>{element}</Wrapper>
      </View>
      <Canvas />
      <View width={width} height={height}>
        <Wrapper>{element}</Wrapper>
      </View>
      <Canvas onClick={modalOff} />
    </>
  );
};

export default Modal;
