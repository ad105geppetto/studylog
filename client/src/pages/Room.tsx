import { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Chat from "components/Chat";
import styled from "styled-components";
import { io } from "socket.io-client";
import axios from "axios";
import { disposeEmitNodes } from "typescript";
import { MdDirectionsRailwayFilled } from "react-icons/md";

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

// interface Props {
//   stream: any;
// }

// const Video = ({ stream }: Props) => {
//   const ref = useRef<HTMLVideoElement>(null);
//   // const [isMuted, setIsMuted] = useState<boolean>(false);

//   useEffect(() => {
//     if (ref.current) ref.current.srcObject = stream;
//     // if (muted) setIsMuted(muted);
//   }, [stream]);

//   return (
//     <div>
//       {/* <VideoContainer ref={ref} muted={isMuted} autoPlay /> */}
//       <video ref={ref} autoPlay />
//     </div>
//   );
// };
type WebRTCUser = {
  id: string;
  email: string;
  stream: MediaStream;
};

interface socketInterface {
  annoy: any;
  roomId: any;
}

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
  // const [users, setUsers] = useState<WebRTCUser[]>([]);
  const [cameraOff, setCameraOff] = useState(false);
  const [mute, setMute] = useState(false);

  const socket = useRef(
    io(`${SERVER}`, {
      withCredentials: true,
    })
  );

  let start = new Date();
  //" (2022 , 5 , 16, 09, 50, 20)"
  let startString = `${start.getFullYear()}, ${start.getMonth()}, ${start.getDate()}, ${start.getHours()}, ${start.getMinutes()}, ${start.getSeconds()}`;

  useEffect(() => {
    socket.current.emit("enterRoom", roomId, userInfo.userId ? userInfo.userId : annoy);

    socket.current.on("welcome", () => {
      //offer 생성
      pc.current
        .createOffer()
        .then((offer) => {
          pc.current.setLocalDescription(offer);
          //1. PeerA의 sdp
          socket.current.emit("offer", roomId, {
            sdp: offer,
          });
        })
        .catch((e) => console.log(e));
    });

    socket.current.on("offer", (data: any) => {
      pc.current.setRemoteDescription(new RTCSessionDescription(data.sdp));
      pc.current
        .createAnswer({
          offerToReceiveAudio: true,
          offerToReceiveVideo: true,
        })
        .then((answer) => {
          pc.current.setLocalDescription(answer);

          //1. PeerB의 sdp
          socket.current.emit("answer", roomId, {
            sdp: answer,
          });
        })
        .catch((e) => console.log(e));
    });

    socket.current.on("answer", (data: any) => {
      pc.current.setRemoteDescription(new RTCSessionDescription(data.sdp));
    });

    socket.current.on("candidate", (candidate: any) => {
      // console.log(candidate);
      candidates.current = [...candidates.current, candidate];

      candidates.current.forEach((candidate: any) => {
        pc.current.addIceCandidate(new RTCIceCandidate(candidate));
      });
    });

    const _pc = new RTCPeerConnection(undefined);

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

    _pc.onicecandidate = (e) => {
      if (e.candidate) {
        // console.log(JSON.stringify(e.candidate));

        //3. candidate
        socket.current.emit("candidate", roomId, e.candidate);
      }
    };

    _pc.ontrack = (e) => {
      //we got remote stream
      remoteVideoRef.current.srcObject = e.streams[0];
      console.log("====e.streams=====");
      console.log(e.streams);
    };

    pc.current = _pc;

    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
      if (pc.current) {
        pc.current.close();
      }
    };
  }, []);

  const exitHandler = () => {
    let end = new Date();
    //" (2022 , 5 , 16, 09, 50, 20)"
    let endString = `${end.getFullYear()}, ${end.getMonth()}, ${end.getDate()}, ${end.getHours()}, ${end.getMinutes()}, ${end.getSeconds()}`;
    if (userInfo.userId) {
      axios.post(
        `${SERVER}/statics`,
        {
          start: startString,
          end: endString,
        },
        { headers: { authorization: `Bearer ${userInfo.accessToken}` } }
      );
    }
    socket.current.emit("out", roomId);
    navigate("/");
  };

  const cameraHandler = () => {
    console.log(localVideoRef.current.srcObject.getVideoTracks());
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
  ///////////////////////
  return (
    <div>
      <video style={{ width: 300, height: 400, margin: 5 }} ref={localVideoRef} autoPlay></video>

      <video style={{ width: 300, height: 400, margin: 5 }} ref={remoteVideoRef} autoPlay></video>

      {/* {users.map((user, index) => (
        <Video key={index} stream={user.stream} />
      ))} */}
      <Chat userInfo={userInfo} socket={socket.current} annoy={annoy} roomId={roomId} />
      <button onClick={cameraHandler}>{cameraOff ? "CameraOn" : "CameraOff"}</button>
      <button onClick={muteHandler}>{mute ? "Mute" : "Unmute"}</button>

      <button onClick={exitHandler}>종료</button>
    </div>
  );
};

export default Room;
