import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";

const Wrapper = styled.div`
  border: 5px solid salmon;
  max-width: 400px;

  ul {
    min-height: 500px;
    border: 3px solid blue;
  }

  div {
    border: 3px solid blue;
  }
`;

interface userInfoInterface {
  userInfo: any;
}
// const socket = io("http://localhost:4000", {
//   withCredentials: true,
// });

const Chat = ({ userInfo }: userInfoInterface) => {
  const { roomId } = useParams();
  const guestNum = (Math.random() * 10000000).toString().slice(0, 4);
  const annoy = `Annoy${guestNum}`;
  const socket = io("http://localhost:4000", {
    withCredentials: true,
  });
  const [text, setText] = useState("");
  const [guest, setGuest] = useState("");
  const [nickName, setNickName] = useState("");
  const [chatLog, setChatLog] = useState<any>([]);

  useEffect(() => {
    setGuest(annoy);
    socket.emit("room", roomId, nickName);
    socket.on("welcome", (name) => {
      const ul = document.getElementById("chatlist");
      const li = document.createElement("li");
      li.textContent = `${name ? name : guest} 님 환영합니다. `;
      ul?.appendChild(li);
    });
  }, []);

  const onChangeMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  useEffect(() => {
    // 서버에서 message 이벤트가 올 경우에 대해서 `on`
    socket.on("chat", (message, name, guest) => {
      const ul = document.getElementById("chatlist");
      const li = document.createElement("li");
      li.textContent = `${name ? name : guest}: ${message}`;
      ul?.appendChild(li);
      // setChatLog([...chatLog, message]);
    });
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  socket.emit("setNickname", nickName);

  // useEffect(() => {
  //   // 서버에서 message 이벤트가 올 경우에 대해서 `on`
  //
  // }, []);

  // useEffect(() => {

  // },[chatLog])

  const clickHandler = () => {
    const ul = document.getElementById("chatlist");
    const li = document.createElement("li");
    li.textContent = `${userInfo.userId ? userInfo.userId : guest}: ${text}`;
    ul?.appendChild(li);
    socket.emit("message", roomId, text, userInfo.userId, guest);
    console.log(text);
    setText("");
  };

  return (
    <Wrapper id="chat">
      <ul id="chatlist"></ul>
      <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => e.preventDefault()}>
        <div className="input">
          <input
            type="text"
            value={text}
            onChange={onChangeMessage}
            placeholder="모든 사용자에게 메시지보내기"
          />
          <button type="submit" onClick={clickHandler}>
            보내기
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default Chat;
