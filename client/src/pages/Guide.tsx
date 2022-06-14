import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import styled from "styled-components";

const LandingWrapper = styled.div`
  overflow: auto;

  ::-webkit-scrollbar {
    display: none;
  }
`;

interface socketInterface {
  socket: any;
}

const Guide = ({ socket }: socketInterface) => {
  const navigate = useNavigate();
  const userInfo = useSelector((state: any) => state.userInfoReducer.userInfo);
  const guestNum = (Math.random() * 10000000).toString().slice(0, 4);
  const annoy = `Annoy${guestNum}`;

  const onClickCreate = () => {
    if (!userInfo.userId) {
      return;
    }
    navigate("/creatingroom");
  };

  return (
    <div>
      <button type="button" onClick={() => navigate("/guide")}>
        Landing
      </button>

      <button type="button" onClick={() => navigate("/signup")}>
        회원가입
      </button>
      <button type="button" onClick={() => navigate("/login")}>
        로그인
      </button>
      <button type="button" onClick={() => navigate("/mypage")}>
        마이페이지
      </button>
      <button type="button" onClick={() => navigate("/todos")}>
        Todos
      </button>
      <button type="button" onClick={() => navigate("/room/id")}>
        room
      </button>
      <button type="button" onClick={onClickCreate}>
        creatingroom
      </button>
      {/* <button type="button" onClick={() => navigate("/roooomlist")}>
        roooomlist
      </button> */}
      <button type="button" onClick={() => navigate("/findinfo")}>
        Find Info
      </button>
      <button type="button" onClick={() => navigate("/roomlist")}>
        roomlist
      </button>
    </div>
  );
};

export default Guide;
