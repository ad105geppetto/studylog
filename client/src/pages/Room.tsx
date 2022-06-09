import { io } from "socket.io-client";
import Chat from "components/Chat";
import { useSelector } from "react-redux";

const socket = io("http://localhost:4000", {
  withCredentials: true,
});

interface Roominterface {
  socket: any;
  userInfo: any;
}
const Room = ({ socket, userInfo }: Roominterface) => {
  //로그인되어있지 않은 경우에는 nickname을 guest로 해주기로 합시다.

  return (
    <div>
      <div id="video"></div>
      <Chat socket={socket} userInfo={userInfo} />
      <div id="room_buttons"></div>
    </div>
  );
};

export default Room;
