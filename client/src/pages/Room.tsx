import { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Chat from "components/Chat";
import styled from "styled-components";
import { io } from "socket.io-client";
import {
  BsMic,
  BsMicMute,
  BsCameraVideo,
  BsCameraVideoOff,
  BsChatSquareText,
  BsChatSquare,
  BsDoorOpen,
} from "react-icons/bs";

const Wrapper = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  flex-flow: column wrap;
  justify-content: space-between;
  width: 100vw;
  height: 100vh;
  background-color: #393d46;
`;

const MediaArea = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
`;

const VideoArea = styled.div`
  display: flex;
  flex-flow: row wrap;
  width: 70vw;
  height: 70vh;
  justify-content: space-evenly;
`;

const ButtonArea = styled.div`
  display: flex;
  margin-bottom: 3vh;
  flex-flow: row wrap;
  justify-content: space-evenly;
`;

const PersonalScreen = styled.video`
  background-color: #f7f6f2;
  border: 0.2rem solid lightgrey;
  border-radius: 1rem;
  margin: 1vw;
  width: 55%;
  height: 55%;
`;

const Button = styled.button`
  all: unset;
  color: white;
  font-size: 3vh;
  &:active {
    position: relative;
    top: 1px;
  }
`;

interface Props {
  stream: any;
}

const Video = ({ stream }: Props) => {
  const ref = useRef<HTMLVideoElement>(null);
  // const [isMuted, setIsMuted] = useState<boolean>(false);

  useEffect(() => {
    if (ref.current) ref.current.srcObject = stream;
    // if (muted) setIsMuted(muted);
  }, [stream]);

  return (
    <div>
      {/* <VideoContainer ref={ref} muted={isMuted} autoPlay /> */}
      <video ref={ref} autoPlay />
    </div>
  );
};

interface socketInterface {
  annoy: any;
  roomId: any;
}

type WebRTCUser = {
  id: string;
  email: string;
  stream: MediaStream;
};

const Room = ({ annoy, roomId }: socketInterface) => {
  const SERVER = process.env.REACT_APP_SERVER || "http://localhost:4000";
  const navigate = useNavigate();
  const userInfo = useSelector((state: any) => state.userInfoReducer.userInfo);
  const localVideoRef = useRef<any>(null);
  const remoteVideoRef = useRef<any>(null);
  const pc = useRef(new RTCPeerConnection(undefined));
  const candidates = useRef<any>([]);
  const [users, setUsers] = useState<WebRTCUser[]>([]);
  const [vedio, setVideo] = useState(false);
  const [audio, setAudio] = useState(false);
  const [chat, setChat] = useState(false);

  const onVideoChange = () => {
    setVideo((video) => !video);
  };
  const onAudioChange = () => {
    setAudio((audio) => !audio);
  };

  const onChatChange = () => {
    setChat((chat) => !chat);
  };

  // const [button, setButton] = useState({
  //   video: false,
  //   audio: false,
  //   chat: false,
  // });

  // const onButtonChange = (key: any) => () => {
  //   setButton({ ...button, [key]: button[key] });
  // };

  const socket = io(`${SERVER}`, {
    withCredentials: true,
  });
  useEffect(() => {
    socket.emit("enterRoom", roomId, userInfo.userId);

    socket.on("welcome", () => {
      //offer 생성
      pc.current
        .createOffer()
        .then((offer) => {
          pc.current.setLocalDescription(offer);
          //1. PeerA의 sdp
          socket.emit("offer", roomId, {
            sdp: offer,
          });
        })
        .catch((e) => console.log(e));
    });

    socket.on("offer", (data: any) => {
      pc.current.setRemoteDescription(new RTCSessionDescription(data.sdp));
      pc.current
        .createAnswer({
          offerToReceiveAudio: true,
          offerToReceiveVideo: true,
        })
        .then((answer) => {
          pc.current.setLocalDescription(answer);

          //1. PeerB의 sdp
          socket.emit("answer", roomId, {
            sdp: answer,
          });
        })
        .catch((e) => console.log(e));
    });

    socket.on("answer", (data: any) => {
      pc.current.setRemoteDescription(new RTCSessionDescription(data.sdp));
    });

    socket.on("candidate", (candidate: any) => {
      // console.log(candidate);
      candidates.current = [...candidates.current, candidate];

      candidates.current.forEach((candidate: any) => {
        pc.current.addIceCandidate(new RTCIceCandidate(candidate));
      });
    });

    ////////////////////

    navigator.mediaDevices
      .getUserMedia({
        audio: false,
        video: true,
      })
      .then((stream) => {
        // display video
        localVideoRef.current.srcObject = stream;

        stream.getTracks().forEach((track) => {
          _pc.addTrack(track, stream);
        });
      })
      .catch((e) => {
        console.log(e);
      });

    const _pc = new RTCPeerConnection(undefined);

    _pc.onicecandidate = (e) => {
      if (e.candidate) {
        // console.log(JSON.stringify(e.candidate));

        //3. candidate
        socket.emit("candidate", roomId, e.candidate);
      }
    };

    _pc.ontrack = (e) => {
      //we got remote stream
      remoteVideoRef.current.srcObject = e.streams[0];
      console.log("====e.streams=====");
      console.log(e.streams);
    };

    pc.current = _pc;
  }, []);

  const endChat = () => {
    console.log(remoteVideoRef.current.srcObject);
    remoteVideoRef.current.srcObject = null;
    console.log(remoteVideoRef.current.srcObject);
    socket.disconnect();
    navigate("/roomlist");
  };
  ///////////////////////
  return (
    <Wrapper>
      <MediaArea>
        <VideoArea>
          <PersonalScreen ref={localVideoRef} autoPlay />
          <PersonalScreen ref={remoteVideoRef} autoPlay />
          {users.map((user, index) => (
            <Video key={index} stream={user.stream} />
          ))}
        </VideoArea>

        <Chat userInfo={userInfo} socket={socket} annoy={annoy} roomId={roomId} />
        {/*       
            상태값에 따라 새로 렌더링을 하는 경우 채팅창 내용이 모두 사라진다.
            렌더링을 새로 하는게 아니라, 별도로 처리를 해줘야 할 ㄷ스 하다  */}
      </MediaArea>
      <ButtonArea>
        {!vedio ? (
          <Button onClick={onVideoChange}>
            <BsCameraVideo />
          </Button>
        ) : (
          <Button onClick={onVideoChange}>
            <BsCameraVideoOff />
          </Button>
        )}
        {!audio ? (
          <Button onClick={onAudioChange}>
            <BsMic />
          </Button>
        ) : (
          <Button onClick={onAudioChange}>
            <BsMicMute />
          </Button>
        )}
        {!chat ? (
          <Button onClick={onChatChange}>
            <BsChatSquareText />
          </Button>
        ) : (
          <Button onClick={onChatChange}>
            <BsChatSquare />
          </Button>
        )}
        <Button onClick={endChat}>
          <BsDoorOpen />
        </Button>
      </ButtonArea>
    </Wrapper>
  );
};

export default Room;
