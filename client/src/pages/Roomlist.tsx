import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { useEffect, useState } from "react";

interface socketInterface {
  socket: any;
  annoy: any;
  roomId: any;
  setRoomId: any;
}

const Roomlist = ({ socket, annoy, roomId, setRoomId }: socketInterface) => {
  const navigate = useNavigate();
  const userInfo = useSelector((state: any) => state.userInfoReducer.userInfo);
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER}/roomlist?page=2&limit=5`)
      .then((res) => {
        // console.log(res.data.data[res.data.data.length - 1]);
        // const target = res.data.data[res.data.data.length - 1];
        // setRoomId(target.id);
        setRooms(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const enterRoomHandler = (room: any) => {
    setRoomId(room.id);
    socket.emit("enterRoom", room.id, userInfo.userId ? userInfo.userId : annoy);
    navigate(`/room/${room.id}`);
  };

  return (
    <div>
      {rooms.length === 0
        ? "없음"
        : rooms.map((room, idx) => {
            return (
              <button key={idx} onClick={() => enterRoomHandler(room)}>
                nnnnnn
              </button>
            );
          })}
    </div>
  );
};

export default Roomlist;
