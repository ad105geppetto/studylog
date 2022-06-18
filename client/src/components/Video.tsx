import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 30%;
  height: 30%;
  /* width: 100%;
  height: 100%; */
  /* display: flex;
  flex-flow: column wrap;
  justify-content: space-evenly; */
`;

const VideoArea = styled.div`
  display: flex;
  flex-flow: row wrap;
  width: 50vw;
  height: 40vh;
  justify-content: space-evenly;
`;

const UserLabel = styled.p`
  display: inline-block;
  position: absolute;
  top: 230px;
  left: 0px;
`;

const PersonalScreen = styled.video`
  background-color: #f7f6f2;
  border: 0.2rem solid lightgrey;
  border-radius: 1rem;
  margin: 1vw;
  width: 100%;
`;

interface Props {
  email: string;
  stream: MediaStream;
  muted?: boolean;
}

const Video = ({ email, stream, muted }: Props) => {
  const ref = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  useEffect(() => {
    if (ref.current) ref.current.srcObject = stream;
    if (muted) setIsMuted(muted);
  }, [stream, muted]);

  return (
    <Container>
      <PersonalScreen ref={ref} autoPlay />
    </Container>
  );
};

export default Video;
