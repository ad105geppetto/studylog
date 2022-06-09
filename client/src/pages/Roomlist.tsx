import { useNavigate } from "react-router-dom";
import { useInsertionEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

interface socketInterface {
  socket: any;
}

const Roomlist = ({ socket }: socketInterface) => {
  const navigate = useNavigate();
  const userInfo = useSelector((state: any) => state.userInfoReducer.userInfo);
  // const [title, setTitle] = useState("");
  // const [content, setContent] = useState("");
  const guestNum = (Math.random() * 10000000).toString().slice(0, 4);
  const annoy = `Annoy${guestNum}`;

  const enterRoomHandler = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER}/roomlist?page=2&limit=10`)
      .then((res) => {
        // console.log(res.data.data[res.data.data.length - 1]);
        const target = res.data.data[res.data.data.length - 1];
        socket.emit("room", target.id, userInfo.userId ? userInfo.userId : annoy);
        navigate(`/room/${target.id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <button onClick={enterRoomHandler}> 방 입장</button>
    </div>
  );
};

export default Roomlist;
