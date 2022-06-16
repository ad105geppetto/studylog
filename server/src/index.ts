import express from "express";
import cookieParser from "cookie-parser";
import indexRouter from "./routes";
import db from "./db/index"
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

const port = 4000;
const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "OPTIONS", "PUT", "PATCH", "DELETE"],
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(express.static("./public/img"));

app.use("/", indexRouter);

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: true,
    credentials: true,
  },
});

// socket.io
function publicRooms() {
  const {
    sockets: {
      adapter: { sids, rooms },
    },
  } = io;
  // 위의 코드는 아래의 코드와 동등하다.
  // const sids = wsServerio.sockets.adapter.sids;
  // const rooms = wsServerio.sockets.adapter.rooms;
  const publicRooms = [];
  rooms.forEach((_, key) => {
    if (sids.get(key) === undefined) {
      publicRooms.push(key);
    }
  });
  return publicRooms;
}

let users = {};
// {
// 15: [{id: 이승재}, {id: 채희찬}]
// }

let usernameToRoom = {};
// {
// 이승재: 15
// 채희찬: 15
// }

let socketToUsername = {};
// {
// socketId: 이승재
// socketId: 채희찬
// }


const maximum = 4;


io.on("connection", (socket) => {
  socket.onAny((event, ...args) => {
    console.log(`got ${event}`);
  });
  console.log(`User connected ${socket.id}`);

  socket.on("enterRoom", (room, username) => {
    if (users[room]) {
      const length = users[room].length;
      if (length === maximum) {
        // socket.to(socket.id).emit("room_full");
        return;
      }
      users[room].push({ id: username });
    } else {
      users[room] = [{ id: username }];
    }
    usernameToRoom[username] = room;
    socketToUsername[socket.id] = username

    socket.join(room);

    // 메세지 && 영상 입장 관련 코드
    socket.to(room).emit("welcome", {
      room: room,
      author: username,
      message: `${username}님이 들어왔습니다.`,
      time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
    });
  });

  socket.on("send_message", (data) => {
    console.log(data);
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("offer", (room, data) => {
    socket.to(room).emit("offer", data);
  });

  socket.on("answer", (room, data) => {
    socket.to(room).emit("answer", data);
  });

  socket.on("candidate", (room, data) => {
    console.log(data);
    socket.to(room).emit("candidate", data);
  });

  socket.on("disconnecting", () => {
    console.log(`[${usernameToRoom[socket.id]}]: ${socket.id} exit`);
    const username = socketToUsername[socket.id]
    const roomID = usernameToRoom[username]; //방 번호 15
    let room = users[roomID]; // 방 배열[이승재, 채희찬]
    if (room) {
      room = room.filter((user) => user.id !== username);
      users[roomID] = room; //[채희찬]
      if (room.length === 0) {
        delete users[roomID];
        const queryString = `DELETE FROM rooms WHERE id = ${roomID}`
        db.query(queryString)
        console.log(roomID, "에서 모든 인원이 나갔습니다.")
        return;
      }
    }
    delete usernameToRoom[username]
    delete socketToUsername[socket.id]
    socket.to(roomID).emit("leave_room", {
      room: roomID,
      author: username,
      message: `${username}님이 나갔습니다.`,
      time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
    });
  });
});

// socket.on("disconnect", () => {
//   console.log(`${socket.id}의 연결이 끊어짐`);
// });
// 방제목이 룸네임으로 하면 되고
// 채팅기능
// 방생성:
// 닉네임: userId, 게스트일경우
// 디스커넥팅:
// 디스커넥트:
// 방나가기 (채팅나가기 + webRTC종료)
// webRTC같이하기

httpServer.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
