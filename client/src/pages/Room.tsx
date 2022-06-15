import { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Chat from "components/Chat";
import styled from "styled-components";
import { io } from "socket.io-client";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  height: 100vh;
  width: 100vw;
  background-color: #393d46;
`;

const VideoContainer = styled.div`
  height: 90vh;
  width: 70%;
`;

const ChatContainer = styled.div``;

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
  // 로그인시 저장 된 userInfo 가지고 오기
  ///////////////////////
  const localVideoRef = useRef<any>(null);
  const remoteVideoRef = useRef<any>(null);
  const pc = useRef(new RTCPeerConnection(undefined));
  const candidates = useRef<any>([]);
  const [users, setUsers] = useState<WebRTCUser[]>([]);

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
    navigate("/");
  };
  ///////////////////////
  return (
    <div>
      <video
        style={{ width: 300, height: 400, margin: 5, backgroundColor: "black" }}
        ref={localVideoRef}
        autoPlay
      ></video>
      <video
        style={{ width: 300, height: 400, margin: 5, backgroundColor: "black" }}
        ref={remoteVideoRef}
        autoPlay
      ></video>
      {users.map((user, index) => (
        <Video key={index} stream={user.stream} />
      ))}
      <Chat userInfo={userInfo} socket={socket} annoy={annoy} roomId={roomId} />
      <button onClick={endChat}>종료</button>
    </div>
  );
};

export default Room;
