import express from "express";
import cookieParser from "cookie-parser";
import indexRouter from "./routes";
import cors from "cors";
import http from "http";
// import { Server } from "socket.io";
let socketio = require("socket.io");

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
let io = socketio.listen(httpServer, {
  cors: {
    origin: true,
    credentials: true,
  },
});

// // socket.io
// function publicRooms() {
//   const {
//     sockets: {
//       adapter: { sids, rooms },
//     },
//   } = io;
//   // 위의 코드는 아래의 코드와 동등하다.
//   // const sids = wsServerio.sockets.adapter.sids;
//   // const rooms = wsServerio.sockets.adapter.rooms;
//   const publicRooms = [];
//   rooms.forEach((_, key) => {
//     if (sids.get(key) === undefined) {
//       publicRooms.push(key);
//     }
//   });
//   return publicRooms;
// }

// let users = {};
// // {
// // 15: [{id: 이승재}, {id: 채희찬}]
// // }

// let usernameToRoom = {};
// // {
// // 이승재: 15
// // 채희찬: 15
// // }

// let socketToUsername = {};
// // {
// // socketId: 이승재
// // socketId: 채희찬
// // }

// const maximum = 4;

// io.on("connection", (socket) => {
//   console.log("접속", socket.id);

//   socket.on("enterRoom", (room, username) => {
//     if (users[room]) {
//       const length = users[room].length;
//       if (length === maximum) {
//         // socket.to(socket.id).emit("room_full");
//         return;
//       }
//       users[room].push({ id: username });
//     } else {
//       users[room] = [{ id: username }];
//     }
//     usernameToRoom[username] = room;
//     socketToUsername[socket.id] = username;

//     //방 입장
//     socket.join(room);
//     // console.log(users, usernameToRoom, socketToUsername);

//     // 메세지 && 영상 입장 관련 코드
//     socket.to(room).emit("welcome", {
//       room: room,
//       author: username,
//       message: `${username}님이 들어왔습니다.`,
//       time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
//     });
//   });

//   socket.on("send_message", (data) => {
//     console.log(data);
//     socket.to(data.room).emit("receive_message", data);
//   });

//   socket.on("offer", (room, data) => {
//     socket.to(room).emit("offer", data);
//   });

//   socket.on("answer", (room, data) => {
//     socket.to(room).emit("answer", data);
//   });

//   socket.on("candidate", (room, data) => {
//     console.log(data);
//     socket.to(room).emit("candidate", data);
//   });

//   console.log(socket.rooms);
//   socket.on("out", (room) => {
//     console.log(socket.rooms);
//     socket.leave(room);
//   });

//   socket.on("disconnecting", () => {
//     console.log("접속해제", socket.id);
//     const username = socketToUsername[socket.id];
//     const roomID = usernameToRoom[username]; //방 번호 15
//     let room = users[roomID]; // 방 배열[이승재, 채희찬]
//     if (room) {
//       room = room.filter((user) => user.id !== username);
//       users[roomID] = room; //[채희찬]
//       if (room.length === 0) {
//         delete users[roomID];
//         return;
//       }
//     }

//     socket.to(roomID).emit("leave_room", {
//       room: roomID,
//       author: username,
//       message: `${username}님이 나갔습니다.`,
//       time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
//     });
//   });
// });

let users = {};

let socketToRoom = {}; // {socket.id : 15}
let socketToName = {}; // {socket.id : kimcoding}

const maximum = process.env.MAXIMUM || 4;

io.on("connection", (socket) => {
  socket.on("join_room", (data) => {
    //data.username
    if (users[data.room]) {
      const length = users[data.room].length;
      if (length === maximum) {
        socket.to(socket.id).emit("room_full");
        return;
      }
      users[data.room].push({ id: socket.id, email: data.email });
    } else {
      users[data.room] = [{ id: socket.id, email: data.email }];
    }
    socketToRoom[socket.id] = data.room;
    socketToName[socket.id] = data.username;

    console.log("users", users);
    console.log("socketToRoom", socketToRoom);

    socket.join(data.room);
    // console.log(`[${socketToRoom[socket.id]}]: ${socket.id} enter`);

    const usersInThisRoom = users[data.room].filter((user) => user.id !== socket.id);

    console.log("이 방에 있는 유저", usersInThisRoom);

    io.sockets.to(socket.id).emit("all_users", usersInThisRoom);
    //채팅
    socket.to(data.room).emit("welcome", {
      message: `${data.username}님이 들어왔습니다.`,
    });
  });

  //채팅
  socket.on("send_message", (data) => {
    console.log(data);
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("offer", (data) => {
    // console.log(data.sdp);
    socket.to(data.offerReceiveID).emit("getOffer", {
      sdp: data.sdp,
      offerSendID: data.offerSendID,
      offerSendEmail: data.offerSendEmail,
    });
  });

  socket.on("answer", (data) => {
    // console.log(data.sdp);
    socket
      .to(data.answerReceiveID)
      .emit("getAnswer", { sdp: data.sdp, answerSendID: data.answerSendID });
  });

  socket.on("candidate", (data) => {
    //console.log(data.candidate);
    socket
      .to(data.candidateReceiveID)
      .emit("getCandidate", { candidate: data.candidate, candidateSendID: data.candidateSendID });
  });

  socket.on("disconnect", () => {
    console.log(`[${socketToRoom[socket.id]}]: ${socket.id} exit`);
    const roomID = socketToRoom[socket.id];
    let room = users[roomID];
    if (room) {
      room = room.filter((user) => user.id !== socket.id);
      users[roomID] = room;
      if (room.length === 0) {
        delete users[roomID];
        console.log(roomID, "에서 모든 인원이 나갔습니다.");
        return;
      }
    }
    // delete usernameToRoom[username]
    // delete socketToUsername[socket.id]
    socket.to(roomID).emit("leave_room", {
      message: `${socketToName[socket.id]}님이 나갔습니다.`,
    });

    socket.to(roomID).emit("user_exit", { id: socket.id });
    console.log(users);
  });
});

httpServer.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
