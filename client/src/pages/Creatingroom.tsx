import { useNavigate } from "react-router-dom";
// import { io } from "socket.io-client";
import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

interface socketInterface {
  socket: any;
}

const Creatingroom = ({ socket }: socketInterface) => {
  const [nickName, setNickName] = useState("");
  const navigate = useNavigate();
  const userInfo = useSelector((state: any) => state.userInfoReducer.userInfo);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  // const roomId = "14";

  // const socket = io("http://localhost:4000", {
  //   withCredentials: true,
  // });
  const titleHandler = (e: any) => {
    setTitle(e.target.value);
  };

  const contentHandler = (e: any) => {
    setContent(e.target.value);
  };

  const createRoomHandler = () => {
    axios
      .post(
        `${process.env.REACT_APP_SERVER}/room`,
        { title: title, content: content },
        {
          headers: { authorization: `Bearer ${userInfo.accessToken}` },
        }
      )
      .then((res) => {
        socket.emit("room", res.data.id, userInfo.userId);
        navigate(`/room/${res.data.id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <input type="text" onChange={titleHandler}></input>
      <input type="text" onChange={contentHandler}></input>
      <button onClick={createRoomHandler}> 생성 </button>
    </div>
  );
};

export default Creatingroom;
