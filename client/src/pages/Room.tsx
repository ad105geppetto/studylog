import Chat from "components/Chat";
import { useSelector } from "react-redux";

interface socketInterface {
  socket: any;
  annoy: any;
  roomId: any;
}

const Room = ({ socket, annoy, roomId }: socketInterface) => {
  const userInfo = useSelector((state: any) => state.userInfoReducer.userInfo);
  // 로그인시 저장 된 userInfo 가지고 오기
  //로그인되어있지 않은 경우에는 nickname을 guest로 해주기로 합시다.

  return (
    <div>
      <div id="video"></div>
      <Chat userInfo={userInfo} socket={socket} annoy={annoy} roomId={roomId} />
      <div id="room_buttons"></div>
    </div>
  );
};

export default Room;
