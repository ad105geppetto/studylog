import React, { useState, useRef, useEffect, useCallback } from "react";
import io from "socket.io-client";
import Video from "../components/Video";
import { useSelector } from "react-redux";
//
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
//

type WebRTCUser = {
  id: string;
  email: string;
  stream: MediaStream;
};

interface socketInterface {
  annoy: any;
  roomId: any;
}

const pc_config = {
  iceServers: [
    // {3
    //   urls: 'stun:[STUN_IP]:[PORT]',
    //   'credentials': '[YOR CREDENTIALS]',
    //   'username': '[USERNAME]'
    // },
    {
      urls: "stun:stun.l.google.com:1902",
    },
  ],
};
const SOCKET_SERVER_URL = "http://localhost:4000";

const Room = ({ annoy, roomId }: socketInterface) => {
  //
  const userInfo = useSelector((state: any) => state.userInfoReducer.userInfo);
  //채팅
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState<any>([]);
  //

  const socketRef = useRef<SocketIOClient.Socket>();
  const pcsRef = useRef<{ [socketId: string]: RTCPeerConnection }>({});
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const localStreamRef = useRef<MediaStream>();
  const [users, setUsers] = useState<WebRTCUser[]>([]);

  //채팅
  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        //방이름
        room: roomId,
        author: userInfo.userId ? userInfo.userId : annoy,
        message: currentMessage,
        time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
      };
      // console.log("내가 쓴 메세지 보기", messageData);

      if (!socketRef.current) return;
      console.log("이게뭔데?", socketRef.current);
      socketRef.current.emit("send_message", messageData);

      //자기메시지
      setMessageList((list: any) => [...list, messageData]);
      setCurrentMessage("");
    }
  };
  //

  const getLocalStream = useCallback(async () => {
    try {
      const localStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: {
          width: 240,
          height: 240,
        },
      });
      localStreamRef.current = localStream;
      if (localVideoRef.current) localVideoRef.current.srcObject = localStream;
      if (!socketRef.current) return;
      socketRef.current.emit("join_room", {
        room: roomId,
      });
    } catch (e) {
      console.log(`getUserMedia error: ${e}`);
    }
  }, []);

  const createPeerConnection = useCallback((socketID: string, email: string) => {
    try {
      const pc = new RTCPeerConnection(pc_config);

      pc.onicecandidate = (e) => {
        if (!(socketRef.current && e.candidate)) return;
        console.log("onicecandidate");
        socketRef.current.emit("candidate", {
          candidate: e.candidate,
          candidateSendID: socketRef.current.id,
          candidateReceiveID: socketID,
        });
      };

      pc.oniceconnectionstatechange = (e) => {
        console.log(e);
      };

      pc.ontrack = (e) => {
        console.log("ontrack success");
        setUsers((oldUsers) =>
          oldUsers
            .filter((user) => user.id !== socketID)
            .concat({
              id: socketID,
              email,
              stream: e.streams[0],
            })
        );
      };

      if (localStreamRef.current) {
        console.log("localstream add");
        localStreamRef.current.getTracks().forEach((track) => {
          if (!localStreamRef.current) return;
          pc.addTrack(track, localStreamRef.current);
        });
      } else {
        console.log("no local stream");
      }

      return pc;
    } catch (e) {
      console.error(e);
      return undefined;
    }
  }, []);

  useEffect(() => {
    socketRef.current = io.connect(SOCKET_SERVER_URL);
    getLocalStream();

    socketRef.current.on("all_users", (allUsers: Array<{ id: string; email: string }>) => {
      allUsers.forEach(async (user) => {
        if (!localStreamRef.current) return;
        const pc = createPeerConnection(user.id, user.email);
        if (!(pc && socketRef.current)) return;
        pcsRef.current = { ...pcsRef.current, [user.id]: pc };
        try {
          const localSdp = await pc.createOffer({
            offerToReceiveAudio: true,
            offerToReceiveVideo: true,
          });
          console.log("create offer success");
          await pc.setLocalDescription(new RTCSessionDescription(localSdp));
          socketRef.current.emit("offer", {
            sdp: localSdp,
            offerSendID: socketRef.current.id,
            offerSendEmail: "offerSendSample@sample.com",
            offerReceiveID: user.id,
          });
        } catch (e) {
          console.error(e);
        }
      });
    });

    socketRef.current.on(
      "getOffer",
      async (data: { sdp: RTCSessionDescription; offerSendID: string; offerSendEmail: string }) => {
        const { sdp, offerSendID, offerSendEmail } = data;
        console.log("get offer");
        if (!localStreamRef.current) return;
        const pc = createPeerConnection(offerSendID, offerSendEmail);
        if (!(pc && socketRef.current)) return;
        pcsRef.current = { ...pcsRef.current, [offerSendID]: pc };
        try {
          await pc.setRemoteDescription(new RTCSessionDescription(sdp));
          console.log("answer set remote description success");
          const localSdp = await pc.createAnswer({
            offerToReceiveVideo: true,
            offerToReceiveAudio: true,
          });
          await pc.setLocalDescription(new RTCSessionDescription(localSdp));
          socketRef.current.emit("answer", {
            sdp: localSdp,
            answerSendID: socketRef.current.id,
            answerReceiveID: offerSendID,
          });
        } catch (e) {
          console.error(e);
        }
      }
    );

    socketRef.current.on(
      "getAnswer",
      (data: { sdp: RTCSessionDescription; answerSendID: string }) => {
        const { sdp, answerSendID } = data;
        console.log("get answer");
        const pc: RTCPeerConnection = pcsRef.current[answerSendID];
        if (!pc) return;
        pc.setRemoteDescription(new RTCSessionDescription(sdp));
      }
    );

    socketRef.current.on(
      "getCandidate",
      async (data: { candidate: RTCIceCandidateInit; candidateSendID: string }) => {
        console.log("get candidate");
        const pc: RTCPeerConnection = pcsRef.current[data.candidateSendID];
        if (!pc) return;
        await pc.addIceCandidate(new RTCIceCandidate(data.candidate));
        console.log("candidate add success");
      }
    );

    socketRef.current.on("user_exit", (data: { id: string }) => {
      if (!pcsRef.current[data.id]) return;
      pcsRef.current[data.id].close();
      delete pcsRef.current[data.id];
      setUsers((oldUsers) => oldUsers.filter((user) => user.id !== data.id));
    });

    //채팅
    // socketRef.current.on("join_room", (data: any) => {
    //   setMessageList((list: any) => [...list, data]);
    // });

    socketRef.current.on("welcome", (data: any) => {
      setMessageList((list: any) => [...list, data]);
    });

    socketRef.current.on("receive_message", (data: any) => {
      //남의메시지
      console.log("상대가 보낸 메세지 보기", data);
      setMessageList((list: any) => [...list, data]);
    });
    socketRef.current.on("leave_room", (data: any) => {
      setMessageList((list: any) => [...list, data]);
    });
    //
    return () => {
      if (socketRef.current) {
        //채팅
        socketRef.current.off("joinRoom");
        socketRef.current.off("receive_message");
        socketRef.current.off("leave_room");
        //
        socketRef.current.disconnect();
      }

      users.forEach((user) => {
        if (!pcsRef.current[user.id]) return;
        pcsRef.current[user.id].close();
        delete pcsRef.current[user.id];
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createPeerConnection, getLocalStream]);

  return (
    <div>
      <video
        style={{
          width: 240,
          height: 240,
          margin: 5,
          backgroundColor: "black",
        }}
        muted
        ref={localVideoRef}
        autoPlay
      />
      {users.map((user, index) => (
        <Video key={index} email={user.email} stream={user.stream} />
      ))}
      {/* <Chat userInfo={userInfo} socket={socketRef.current} annoy={annoy} roomId={roomId} /> */}
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
    </div>
  );
};

export default Room;
