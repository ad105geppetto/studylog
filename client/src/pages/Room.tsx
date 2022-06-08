import { io } from "socket.io-client";
import Chat from "components/Chat";
import { useSelector } from "react-redux";

const socket = io("http://localhost:4000", {
  withCredentials: true,
});

const Room = () => {
  //로그인되어있지 않은 경우에는 nickname을 guest로 해주기로 합시다.
  const userInfo = useSelector((state: any) => state.userInfoReducer.userInfo);
  // 로그인시 저장 된 userInfo 가지고 오기

  return (
    <div>
      <div id="video"></div>
      <Chat userInfo={userInfo} />
      <div id="room_buttons"></div>
    </div>
  );
};

export default Room;
