import React, { useState, useRef, useEffect, useCallback } from "react";
import io from "socket.io-client";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import Video from "../components/Video";
import { useSelector } from "react-redux";
import styled from "styled-components";
import {
  BsMic,
  BsMicMute,
  BsCameraVideo,
  BsCameraVideoOff,
  BsChatSquareText,
  BsChatSquare,
  BsDoorOpen,
} from "react-icons/bs";
import { BiMailSend } from "react-icons/bi";

const Wrapper = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  width: 100vw;
  height: 100vh;
  background-color: #393d46;
`;

const MediaArea = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: space-between;
`;
const ButtonArea = styled.div`
  display: flex;
  margin-bottom: 3vh;
  flex-flow: row wrap;
  justify-content: space-evenly;
`;

const VideoArea = styled.div<{ size?: string }>`
  margin-top: 1vw;
  margin-left: 1vw;
  margin-right: 1vw;
  display: grid;
  width: ${(props) => props.size}vw;
  height: 85vh;
  grid-template-columns: repeat(2, 50%);
  grid-template-rows: repeat(2, 50%);
  place-content: center;
  place-items: center;
  grid-gap: 1vh;

  @media only screen and (max-width: 400px) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(4, 25%);
  }
`;

export const PersonalScreen = styled.video<{ width: string; height: string }>`
  border: 0.3vh solid lightgrey;
  border-radius: 1rem;
  width: ${(props) => props.width}%;
  height: ${(props) => props.height}%;
  object-fit: fill;
`;

const Button = styled.button`
  all: unset;
  color: white;
  font-size: 3vh;

  &:hover {
    color: lightseagreen;
  }

  &:active {
    position: relative;
    top: 1px;
  }
`;

const ChatWindow = styled.div<{ view?: string }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #4b6587;
  width: 20vw;
  height: 85vh;
  margin: 1vw 1.5vw 0 0;
  border: 0.3rem solid lightgrey;
  border-radius: 1rem;
  overflow-y: auto;
  display: ${(props) => props.view};
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
  background-color: #f7f6f2;
  word-break: break-all;
`;

const ChatInput = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  margin: 0 1.8rem 2rem 1.3rem;
  height: 9vh;

  textarea {
    border: none;
    resize: none;
    height: 100%;
    border-radius: 1rem;
    border: 0.2rem solid lightgrey;
    width: 100%;
    ::-webkit-input-placeholder {
      line-height: 9vh;
      text-align: center;
    }
    ::-webkit-scrollbar {
      display: none;
    }
  }

  button {
    all: unset;
    margin-left: -5vw;
  }
`;

const ChatInfo = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TimeStamp = styled.div`
  line-height: 3vh;
  text-align: center;
  margin: 0 1vw 0 0;
  font-size: 1vh;
`;

const UserName = styled(TimeStamp)`
  font-size: 1.2vh;
  font-weight: bolder;
`;

const Message = styled.div`
  font-size: 1.5vh;
  margin-bottom: 0.5vh;
`;

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
      urls: [
        "stun:stun.l.google.com:19302",
        "stun:stun1.l.google.com:19302",
        "stun:stun2.l.google.com:19302",
        "stun:stun3.l.google.com:19302",
        "stun:stun4.l.google.com:19302",
      ],
    },
  ],
};
const SERVER = process.env.REACT_APP_SERVER || "http://localhost:4000";

const Room = ({ annoy, roomId }: socketInterface) => {
  let start = new Date();
  let startObject = {
    year: start.getFullYear(),
    month: start.getMonth(),
    date: start.getDate(),
    hour: start.getHours(),
    minute: start.getMinutes(),
    second: start.getSeconds(),
  };

  const userInfo = useSelector((state: any) => state.userInfoReducer.userInfo);
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState<any>([]);
  const navigate = useNavigate();
  const socketRef = useRef<SocketIOClient.Socket>();
  const pcsRef = useRef<{ [socketId: string]: RTCPeerConnection }>({});
  const localVideoRef = useRef<any>(null);
  const localStreamRef = useRef<MediaStream>();
  const [users, setUsers] = useState<WebRTCUser[]>([]);
  const [cameraOff, setCameraOff] = useState(false);
  const [mute, setMute] = useState(false);
  const [chat, setChat] = useState(false);
  const [chatView, setChatView] = useState("none");
  //채팅

  const messageBoxRef = useRef<any>();

  const scrollToBottom = () => {
    if (messageBoxRef.current) {
      messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messageList]);

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
    // onScrollMove();
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
        username: userInfo.userId ? userInfo.userId : annoy,
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
    const handleTabClose = (event: any) => {
      event.preventDefault();
      exitHandler();
      console.log("beforeunload event triggered");

      // return (event.returnValue = "Are you sure you want to exit?");
    };
    window.addEventListener("beforeunload", handleTabClose);

    return () => {
      window.removeEventListener("beforeunload", handleTabClose);
    };
  }, []);

  useEffect(() => {
    socketRef.current = io.connect(SERVER);
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
      if (!data) {
        return;
      }
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

  const exitHandler = () => {
    let end = new Date();
    //" (2022 , 5 , 16, 09, 50, 20)"
    let endObject = {
      year: end.getFullYear(),
      month: end.getMonth(),
      date: end.getDate(),
      hour: end.getHours(),
      minute: end.getMinutes(),
      second: end.getSeconds(),
    };
    if (userInfo.userId) {
      axios.post(
        `${SERVER}/statics`,
        {
          userId: userInfo.id,
          startObject: startObject,
          endObject: endObject,
        },
        { headers: { authorization: `Bearer ${userInfo.accessToken}` } }
      );
    }

    axios
      .patch(`${SERVER}/room`, {
        userId: userInfo.id,
        roomId,
        type: "minus",
      })
      .then((res) => {});
    console.log();

    navigate("/roomlist");
  };

  const cameraHandler = () => {
    localVideoRef.current.srcObject
      .getVideoTracks()
      .forEach((track: any) => (track.enabled = !track.enabled));
    if (cameraOff) {
      setCameraOff(!cameraOff);
    } else {
      setCameraOff(!cameraOff);
    }
  };

  const muteHandler = () => {
    localVideoRef.current.srcObject
      .getAudioTracks()
      .forEach((track: any) => (track.enabled = !track.enabled));
    if (mute) {
      setMute(!mute);
    } else {
      setMute(!mute);
    }
  };

  const onChatChange = () => {
    setChat((chat) => !chat);
  };

  return (
    <Wrapper id="Wrapper">
      <MediaArea id="MediaArea">
        {chat ? (
          <VideoArea size="75" id="VideoArea">
            <PersonalScreen width="100" height="100" muted ref={localVideoRef} autoPlay />
            {users.map((user, index) => (
              <Video width="100" height="100" key={index} email={user.email} stream={user.stream} />
            ))}
          </VideoArea>
        ) : (
          <VideoArea size="100" id="VideoArea">
            <PersonalScreen width="100" height="100" muted ref={localVideoRef} autoPlay />
            {users.map((user, index) => (
              <Video width="100" height="100" key={index} email={user.email} stream={user.stream} />
            ))}
          </VideoArea>
        )}

        {/* <Chat userInfo={userInfo} socket={socketRef.current} annoy={annoy} roomId={roomId} /> */}

        {/* ------------------------ ---------------------  --------------- */}
        {chat ? (
          <ChatWindow id="Chat">
            <div
              style={{
                marginTop: "1vw",
                textAlign: "center",
                fontWeight: "bolder",
                fontSize: "1.7vh",
                color: "white",
              }}
            >
              Live Chat
            </div>
            <ChatView ref={messageBoxRef}>
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
                placeholder="Message를 입력해주세요."
                onChange={(event: any) => {
                  setCurrentMessage(event.target.value);
                }}
                onKeyPress={(event: any) => {
                  event.key === "Enter" && sendMessage();
                  console.log(event);
                }}
              />
              <button onClick={sendMessage}>
                <BiMailSend size="2rem" color="#393D46" />
              </button>
            </ChatInput>
          </ChatWindow>
        ) : (
          <ChatWindow view={chatView} id="Chat">
            <div
              style={{
                marginTop: "1vw",
                textAlign: "center",
                fontWeight: "bolder",
                fontSize: "1.7vh",
                color: "white",
              }}
            >
              Live Chat
            </div>
            <ChatView id="chatwindow">
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
                placeholder="Message를 입력해주세요."
                onChange={(event: any) => {
                  setCurrentMessage(event.target.value);
                }}
                onKeyPress={(event: any) => {
                  event.key === "Enter" && sendMessage();
                  console.log(event);
                }}
              />
              <button onClick={sendMessage}>
                <BiMailSend size="2rem" color="#393D46" />
              </button>
            </ChatInput>
          </ChatWindow>
        )}
      </MediaArea>
      <ButtonArea>
        <Button onClick={cameraHandler}>
          {cameraOff ? <BsCameraVideoOff /> : <BsCameraVideo />}
        </Button>

        <Button onClick={muteHandler}>{!mute ? <BsMic /> : <BsMicMute />}</Button>

        <Button onClick={onChatChange}>{chat ? <BsChatSquareText /> : <BsChatSquare />}</Button>

        <Button onClick={exitHandler}>
          <BsDoorOpen />
        </Button>
      </ButtonArea>
    </Wrapper>
  );
};

export default Room;
