import { useState, useEffect } from "react";

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
        author: userInfo.userId,
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

  // const endChat = () => {
  //   navigate("/");
  // };

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        {messageList.map((messageContent: any, idx: any) => {
          return (
            <div
              key={idx}
              className="message"
              id={userInfo.userId === messageContent.author ? "you" : "other"}
            >
              <div>
                <div className="message-content">
                  <p>{messageContent.message}</p>
                </div>
                <div className="message-meta">
                  <p id="time">{messageContent.time}</p>
                  <p id="author">{messageContent.author}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="Hey..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
};

export default Chat;
