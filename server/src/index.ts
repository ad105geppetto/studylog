import express from "express";
import cookieParser from "cookie-parser";
import indexRouter from "./routes";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

const port = 4000;
const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "OPTIONS", "PUT", "PATCH", "DELETE"],
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/", indexRouter);

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
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

io.on("connection", (socket) => {
  socket.on("room", (roomName, userId) => {
    socket.join(roomName);
    console.log(roomName);
    console.log(io.sockets.adapter.rooms);
    console.log(io.sockets.adapter.sids);
    socket.to(roomName).emit("welcome", userId);
  });

  socket.on("message", (roomName, message, userId, guest) => {
    console.log("=======메세지========");
    console.log(io.sockets.adapter.rooms);
    console.log(io.sockets.adapter.sids);
    console.log(socket.rooms);
    socket.to(roomName).emit("chat", message, userId, guest);
    // 룸네임이 문제다.
    console.log(message);
  });

  socket.on("disconnecting", () => {
    socket.rooms.forEach((room) => socket.to(room).emit("bye", "나갔습니다."));
  });
});

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
