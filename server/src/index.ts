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
  console.log(`User connected ${socket.id}`);

  socket.on("enterRoom", (room, username) => {
    socket.join(room);
    console.log(`User with Id: ${socket.id} joined room: ${room}`);
    console.log(socket.rooms);
    socket.broadcast.to(room).emit("joinRoom", {
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

  socket.on("leave_room", (room, username) => {
    console.log("방에서 떠남");
    socket.leave(room);
    console.log(socket.rooms);
    socket.broadcast.to(room).emit("leave_room", {
      room: room,
      author: username,
      message: `${username}님이 나갔습니다.`,
      time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
    });
  });

  socket.emit("connection-success", {
    status: "connection-success",
    socketId: socket.id,
  });

  socket.on("sdp", (data) => {
    console.log(data);
    socket.broadcast.emit("sdp", data);
  });

  socket.on("candidate", (data) => {
    console.log(data);
    socket.broadcast.emit("candidate", data);
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
