import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

interface socketInterface {
  socket: any;
  setRoomId: any;
}

const Creatingroom = ({ socket, setRoomId }: socketInterface) => {
  const navigate = useNavigate();
  const userInfo = useSelector((state: any) => state.userInfoReducer.userInfo);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

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
        setRoomId(res.data.id);
        socket.emit("enterRoom", res.data.id, userInfo.userId);
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
{
  /* <div>
      <div>
        <Nav />
      </div>
      <div>
        <div>
          <label htmlFor="roomName">방제목</label>
          <input type="text" id="roomName" />
        </div>
        <div>
          <label htmlFor="content">내용</label>
          <input type="text" id="content" />
        </div>
        <button type="button" onClick={onCreateRoom}>
          확인
        </button>
      </div> */
}
