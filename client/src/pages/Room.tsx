import { io } from "socket.io-client";
import Chat from "components/Chat";
import { useSelector } from "react-redux";

interface socketInterface {
  socket: any;
  userInfo: any;
}

const Room = ({ userInfo, socket }: socketInterface) => {
  //로그인되어있지 않은 경우에는 nickname을 guest로 해주기로 합시다.

  return (
    <div>
      <div id="video"></div>
      <Chat userInfo={userInfo} socket={socket} />
      <div id="room_buttons"></div>
    </div>
  );
};

export default Room;
