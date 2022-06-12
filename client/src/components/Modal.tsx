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
  left: calc(50vw - ${(props) => props.width}px / 2);
  top: calc(50vh - ${(props) => props.height}px / 2);
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  padding: 8px;
  background-color: white;
  border-radius: 8px;
  animation-name: switchModalOn;
  animation-duration: 0.5s;
  z-index: 2000;
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

// 모달창 내용물 감싸는 div
const Wrapper = styled.div``;

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
  animation-duration: 0.5s;
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

      {/* 모달창 끄는 코드 */}
      <View width={width} height={height}>
        {/* 모달창에 X마크를 나타내는 태그 */}
        {/* <div className="exit-wrapper" onClick={modalOff}>
          &times;
        </div> */}
        <Wrapper>{element}</Wrapper>
      </View>
      <Canvas onClick={modalOff} />
    </>
  );
};

export default Modal;
