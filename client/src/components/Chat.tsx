import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";

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
  socket: any;
  annoy: any;
  roomId: any;
}

const Chat = ({ userInfo, socket, annoy, roomId }: userInfoInterface) => {
  const [text, setText] = useState("");
  const navigator = useNavigate();

  useEffect(() => {
    socket.on("welcome", (name: any) => {
      console.log(socket.rooms);
      const ul = document.getElementById("chatlist");
      const li = document.createElement("li");
      li.textContent = `${name} 님이 입장했습니다. `;
      ul?.appendChild(li);
    });
  }, []);

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
      // setChatLog([...chatLog, message]);
    });

    socket.on("bye", (left: any) => {
      const ul = document.getElementById("chatlist");
      const li = document.createElement("li");
      li.textContent = `${left}`;
      ul?.appendChild(li);
    });
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  const clickHandler = () => {
    const ul = document.getElementById("chatlist");
    const li = document.createElement("li");
    li.textContent = `${userInfo.userId ? userInfo.userId : annoy}: ${text}`;
    ul?.appendChild(li);
    socket.emit("message", roomId, text, userInfo.userId, annoy);
    console.log(annoy);
    setText("");
  };

  const leaveHandler = () => {
    console.log("dddd");
    window.location.replace("/");
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
          <button type="submit" onClick={leaveHandler}>
            나가기
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default Chat;
