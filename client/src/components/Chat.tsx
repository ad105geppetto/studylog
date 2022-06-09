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

interface ChatInterface {
  userInfo: any;
  socket: any;
}

const Chat = ({ userInfo, socket }: ChatInterface) => {
  const { roomId } = useParams();
  const guestNum = (Math.random() * 10000000).toString().slice(0, 4);
  const annoy = `Annoy${guestNum}`;
  const [text, setText] = useState("");
  const [guest, setGuest] = useState("");
  const [nickName, setNickName] = useState("");
  const [chatLog, setChatLog] = useState<any>([]);

  useEffect(() => {
    setGuest(annoy);

    socket.on("welcome", (name: any) => {
      const ul = document.getElementById("chatlist");
      const li = document.createElement("li");
      li.textContent = `${name ? name : guest} 님 환영합니다. `;
      ul?.appendChild(li);
    });
    console.log(roomId);
  }, []);

  const onGetInRoom = (e: React.MouseEvent<HTMLButtonElement>) => {
    socket.emit("room", roomId, nickName);
  };

  const onChangeMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  useEffect(() => {
    // 서버에서 message 이벤트가 올 경우에 대해서 `on`
    socket.on("chat", (message: any, name: any, guest: any) => {
      const ul = document.getElementById("chatlist");
      const li = document.createElement("li");
      li.textContent = `${name ? name : guest}: ${message}`;
      ul?.appendChild(li);
      console.log("message : ", message);
      // setChatLog([...chatLog, message]);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  const clickHandler = () => {
    if (!text) {
      return;
    }
    const ul = document.getElementById("chatlist");
    const li = document.createElement("li");
    li.textContent = `${userInfo.userId ? userInfo.userId : guest}: ${text}`;
    ul?.appendChild(li);
    socket.emit("message", roomId, text, userInfo.userId, guest);
    console.log("text:", text);
    setText("");
  };

  return (
    <Wrapper id="chat">
      <button onClick={onGetInRoom}>입장!!</button>
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
