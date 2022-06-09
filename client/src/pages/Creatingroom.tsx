import { useNavigate } from "react-router-dom";

import { useState } from "react";
import Chat from "components/Chat";

interface Creatingroom {
  socket: any;
  userInfo: any;
}

const Creatingroom = ({ socket, userInfo }: Creatingroom) => {
  const [nickName, setNickName] = useState("");
  const navigate = useNavigate();
  const roomId = "14";

  const onGetInRoom = (e: React.MouseEvent<HTMLButtonElement>) => {
    socket.emit("room", roomId, nickName);
    navigate(`/room/${roomId}`);
  };

  return (
    <div>
      <button onClick={onGetInRoom}> 생성 </button>
      <Chat userInfo={userInfo} socket={socket} />
    </div>
  );
};

export default Creatingroom;
