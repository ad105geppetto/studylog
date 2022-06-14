import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { useEffect, useState } from "react";

interface socketInterface {
  annoy: any;
  roomId: any;
  setRoomId: any;
}

const SERVER = process.env.REACT_APP_SERVER || "http://localhost:4000";

const Roomlist = ({ annoy, roomId, setRoomId }: socketInterface) => {
  const navigate = useNavigate();
  const userInfo = useSelector((state: any) => state.userInfoReducer.userInfo);
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    axios
      .get(`${SERVER}/roomlist?page=2&limit=14`)
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
    // socket.emit("enterRoom", room.id, userInfo.userId ? userInfo.userId : annoy);
    navigate(`/room/${room.id}`);
  };

  return (
    <div>
      {rooms.length === 0
        ? "없음"
        : rooms.map((room: any, idx: any) => {
            console.log(room);
            return (
              <button key={idx} onClick={() => enterRoomHandler(room)}>
                {`Room ID: ${room.id}, title: ${room.title}`}
              </button>
            );
          })}
    </div>
  );
};

// 쿠팡 검색 인풋창 ----------------------------------------------------------------
// // {/* <input
//   type="text"
//   id="headerSearchKeyword"
//   class="coupang-search is-speech"
//   name="q"
//   title="쿠팡 상품 검색"
//   value="냉면"
//   data-searchad='{"channel":"", "copy":"찾고 싶은 상품을 검색해보세요!", "linkType":"", "linkContent":"", "newWindow":""}'
//   placeholder="찾고 싶은 상품을 검색해보세요!"
//   autocomplete="off"
// ></input>; */}

// 검색버튼 ----------------------------------------------------------------
// {
/* <a href="javascript:;" id="headerSearchBtn" className="search" title="검색">
  검색
</a>; */
// }
export default Roomlist;
