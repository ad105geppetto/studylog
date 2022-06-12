import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface userInfoInterface {
  userInfo: any;
  socket: any;
  annoy: any;
  roomId: any;
}

const Chat = ({ userInfo, socket, annoy, roomId }: userInfoInterface) => {
  const navigate = useNavigate();

  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState<any>([]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: roomId,
        author: userInfo.userId,
        message: currentMessage,
        time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      //자기메시지
      setMessageList((list: any) => [...list, messageData]);
      setCurrentMessage("");
    }
  };
  const endChat = async () => {
    await socket.emit("leave_room", roomId, userInfo.userId);
    navigate("/");
  };

  useEffect(() => {
    socket.on("joinRoom", (data: any) => {
      setMessageList((list: any) => [...list, data]);
    });

    socket.on("receive_message", (data: any) => {
      //남의메시지
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
  }, []);

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
      <button onClick={endChat}>종료</button>
    </div>
  );
};

export default Chat;
