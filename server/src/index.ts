import express from "express";
import cookieParser from "cookie-parser";
import indexRouter from "./routes";
import cors from "cors";
import http from "http";
import dotenv from "dotenv";
dotenv.config();
// import { Server } from "socket.io";
let socketio = require("socket.io");

const port = process.env.SERVER_PORT || 4000;
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

app.use("/public/img", express.static(__dirname + "/../public/img"));

app.use("/", indexRouter);

const httpServer = http.createServer(app);
let io = socketio.listen(httpServer, {
  cors: {
    origin: true,
    credentials: true,
  },
});

let users = {};
let socketToRoom = {}; // {socket.id : 15}
let socketToName = {}; // {socket.id : kimcoding}

const maximum = process.env.MAXIMUM || 4;

io.on("connection", (socket) => {
  socket.on("joinRoom", (data) => {
    //data.username
    if (users[data.room]) {
      const length = users[data.room].length;
      if (length === maximum) {
        return;
      }
      users[data.room].push({ id: socket.id });
    } else {
      users[data.room] = [{ id: socket.id }];
    }
    socketToRoom[socket.id] = data.room;
    socketToName[socket.id] = data.username;

    console.log("users", users);
    console.log("socketToRoom", socketToRoom);

    socket.join(data.room);
    // console.log(`[${socketToRoom[socket.id]}]: ${socket.id} enter`);

    const usersInThisRoom = users[data.room].filter((user) => user.id !== socket.id);

    console.log("이 방에 있는 유저", usersInThisRoom);

    io.sockets.to(socket.id).emit("allUsers", usersInThisRoom);
    //채팅
    socket.to(data.room).emit("welcome", {
      message: `${data.username}님이 들어왔습니다.`,
    });
  });

  //채팅
  socket.on("sendMessage", (data) => {
    console.log(data);
    socket.to(data.room).emit("receiveMessage", data);
  });

  socket.on("offer", (data) => {
    // console.log(data.sdp);
    socket.to(data.offerReceiveID).emit("getOffer", {
      sdp: data.sdp,
      offerSendID: data.offerSendID,
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
    socket.to(roomID).emit("leaveRoom", {
      message: `${socketToName[socket.id]}님이 나갔습니다.`,
    });

    socket.to(roomID).emit("userExit", { id: socket.id });
    console.log(users);
  });
});

httpServer.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
