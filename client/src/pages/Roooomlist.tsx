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

const Roooomlist = ({ socket, annoy, roomId, setRoomId }: socketInterface) => {
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
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // 페이지 목록에서 방을 클릭했을 때 방으로 들어가진다.
  const enterRoomHandler = (room: any) => {
    // 서버에서 받아온 방 id값
    setRoomId(room.id);
    // 소켓에 이벤트 발생시키기
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

// 검색버튼 ----------------------------------------------------------------
{
  /* <a href="javascript:;" id="headerSearchBtn" className="search" title="검색">
  검색
</a>; */
}
export default Roooomlist;
