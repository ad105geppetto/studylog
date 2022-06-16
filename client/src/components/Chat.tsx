import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const ChatWindow = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #f0e5cf;
  width: 20vw;
  height: 85vh;
  margin: 1vw 1vw 0 0;
  border: 0.3rem solid lightgrey;
  border-radius: 1rem;
  overflow-y: auto;
`;

const ChatView = styled.div`
  display: flex;
  margin: 2vh 2vh 2vh 2vh;
  padding-top: 1rem;
  flex-direction: column;
  background-color: #f7f6f2;
  border: 0.2rem solid lightgrey;
  border-radius: 1rem;
  height: 70vh;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: #f7f6f2;
  word-break: break-all;
`;

const ChatInfo = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const TimeStamp = styled.div`
  line-height: 3vh;
  text-align: center;
  margin: 0 0 0 5vw;
  font-size: 1vh;
`;

const UserName = styled(TimeStamp)`
  margin: 0 0 0 1vw;
  font-size: 1.5vh;
`;

const Message = styled.span`
  font-size: 1.5vh;
`;

const ChatInput = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  margin: 0 1.5rem 1rem 1rem;
  height: 9vh;
  text-indent: 30px;

  textarea {
    border: none;
    resize: none;
    line-height: 100%;
    border-radius: 1rem;
    padding: 0 1vw 0 1vw;
    border: 0.2rem solid lightgrey;
    width: 90%;
  }

  button {
    all: unset;
    margin-left: -5vw;
  }
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
    socket.on("join_room", (data: any) => {
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
      <div className="title"> MESSAGE </div>
      <ChatView>
        {messageList.map((messageContent: any, idx: any) => {
          return (
            <div
              key={idx}
              className="message"
              id={userInfo.userId === messageContent.author ? "you" : "other"}
            >
              <ChatInfo>
                <UserName>{messageContent.author}</UserName>
                <TimeStamp>{messageContent.time}</TimeStamp>
              </ChatInfo>
              <Message>{messageContent.message}</Message>
            </div>
          );
        })}
      </ChatView>
      <ChatInput>
        <textarea
          value={currentMessage}
          placeholder="Hey..."
          onChange={(event: any) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event: any) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button onClick={sendMessage}> 전송 </button>
      </ChatInput>
    </ChatWindow>
  );
};

export default Chat;
