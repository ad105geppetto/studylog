import { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import Chat from "components/Chat";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 100vh;
  background-color: #393d46;
`;

const VideoContainer = styled.div`
  height: 90vh;
  width: 70%;
`;

const ChatContainer = styled.div`
  height: 90vh;
  width: 30%;
  background-color: white;
  border-radius: 10px;
`;

interface socketInterface {
  socket: any;
  annoy: any;
  roomId: any;
}

const Room = ({ socket, annoy, roomId }: socketInterface) => {
  const userInfo = useSelector((state: any) => state.userInfoReducer.userInfo);
  // 로그인시 저장 된 userInfo 가지고 오기
  ///////////////////////
  const localVideoRef = useRef<any>(null);
  const remoteVideoRef = useRef<any>(null);
  const pc = useRef(new RTCPeerConnection(undefined));
  const textRef = useRef<any>();
  const candidates = useRef<any>([]);

  // const socketRef = useRef<SocketIOClient.Socket>();
  // const pcRef = useRef<RTCPeerConnection>();

  useEffect(() => {
    socket.on("connection-success", (success: any) => {
      console.log(success);
    });

    socket.on("sdp", (data: any) => {
      console.log(data);
      //textarea에 적어놓을게 아니라
      textRef.current.value = JSON.stringify(data.sdp);
    });

    socket.on("candidate", (candidate: any) => {
      console.log(candidate);
      candidates.current = [...candidates.current, candidate];
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
        console.log(JSON.stringify(e.candidate));

        //3. candidate
        socket.emit("candidate", e.candidate);
      }
    };

    _pc.oniceconnectionstatechange = (e) => {
      console.log(e);
    };

    _pc.ontrack = (e) => {
      //we got remote stream
      remoteVideoRef.current.srcObject = e.streams[0];
    };

    pc.current = _pc;
  }, [socket]);

  const createOffer = () => {
    pc.current
      .createOffer({
        offerToReceiveAudio: true,
        offerToReceiveVideo: true,
      })
      .then((sdp) => {
        console.log(JSON.stringify(sdp));
        pc.current.setLocalDescription(sdp);

        //1. PeerA의 sdp
        socket.emit("sdp", {
          sdp: sdp,
        });
      })
      .catch((e) => console.log(e));
  };

  const createAnswer = () => {
    pc.current
      .createAnswer({
        offerToReceiveAudio: 1,
        offerToReceiveVideo: 1,
      })
      .then((sdp) => {
        console.log(JSON.stringify(sdp));
        pc.current.setLocalDescription(sdp);

        //1. PeerB의 sdp
        socket.emit("sdp", {
          sdp: sdp,
        });
      })
      .catch((e) => console.log(e));
  };

  const setRemoteDescription = () => {
    // get the  SDP value from the text editor
    const sdp = JSON.parse(textRef.current.value);
    console.log(sdp);
    pc.current.setRemoteDescription(new RTCSessionDescription(sdp));
  };

  const addCandidate = () => {
    // const candidate = JSON.parse(textRef.current.value);
    // console.log(candidate);

    candidates.current.forEach((candidate: any) => {
      console.log(candidate);
      pc.current.addIceCandidate(new RTCIceCandidate(candidate));
    });
  };
  ///////////////////////
  return (
    <Container>
      <VideoContainer>
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
      </VideoContainer>
      <ChatContainer>
        <Chat userInfo={userInfo} socket={socket} annoy={annoy} roomId={roomId} />
      </ChatContainer>

      <br />
      <button onClick={createOffer}>Create Offer</button>
      <button onClick={createAnswer}>Create Answer</button>
      <br />
      <textarea ref={textRef}></textarea>
      <br />
      <button onClick={setRemoteDescription}>Set Remote Description</button>
      <button onClick={addCandidate}>Add Candidates</button>
    </Container>
  );
};

export default Room;
