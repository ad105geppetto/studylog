import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const ChatWindow = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background-color: white;
  width: 20vw;
  min-height: 100%;
  max-height: 100%;
  overflow-y: auto;
`;

const ChatView = styled(ChatWindow)`
  flex-direction: column;
  justify-content: flex-end;
  max-height: 80%;
`;

const ChatInput = styled(ChatWindow)`
  flex-direction: column;
  justify-content: flex-end;
  max-height: 20%;
`;

interface userInfoInterface {
  userInfo: any;
  socket: any;
  annoy: any;
  roomId: any;
}

const Chat = ({ userInfo, socket, annoy, roomId }: userInfoInterface) => {
  // const navigate = useNavigate();

  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState<any>([]);

  useEffect(() => {
    socket.on("join_Room", (data: any) => {
      console.log("12313");
      setMessageList((list: any) => [...list, data]);
    });

    socket.on("welcome", (data: any) => {
      setMessageList((list: any) => [...list, data]);
    });

    socket.on("receive_message", (data: any) => {
      //남의메시지
      console.log("상대가 보낸 메세지 보기", data);
      setMessageList((list: any) => [...list, data]);
    });
    socket.on("leave_room", (data: any) => {
      setMessageList((list: any) => [...list, data]);
    });

    return () => {
      socket.off("joinRoom");
      socket.off("receive_message");
      socket.off("leave_room");
    };
  }, [socket]);

  const sendMessage = () => {
    if (currentMessage !== "") {
      const messageData = {
        room: roomId,
        author: userInfo.userId ? userInfo.userId : annoy,
        message: currentMessage,
        time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
      };
      console.log("내가 메세지 보기", messageData);
      socket.emit("send_message", messageData);

      //자기메시지
      setMessageList((list: any) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  return (
    <ChatWindow>
      <div> Live Chat </div>
      <ChatView>
        {messageList.map((messageContent: any, idx: any) => {
          return (
            <div
              key={idx}
              className="message"
              id={userInfo.userId === messageContent.author ? "you" : "other"}
            >
              <div>
                <p>{messageContent.message}</p>
                <p id="time">{messageContent.time}</p>
                <p id="author">{messageContent.author}</p>
              </div>
            </div>
          );
        })}
      </ChatView>
      <div className="chat-footer">
        <ChatInput
          as="input"
          type="text"
          value={currentMessage}
          placeholder="Hey..."
          onChange={(event: any) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event: any) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </ChatWindow>
  );
};

export default Chat;
