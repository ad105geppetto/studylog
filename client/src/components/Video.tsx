import React, { useEffect, useRef, useState } from "react";
import { PersonalScreen } from "pages/Room";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-flow: column wrap;
  justify-content: space-evenly;
  background-color: red;
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

interface Props {
  width: string;
  height: string;
  email: string;
  stream: MediaStream;
  muted?: boolean;
}

const Video = ({ width, height, email, stream, muted }: Props) => {
  const ref = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  useEffect(() => {
    if (ref.current) ref.current.srcObject = stream;
    if (muted) setIsMuted(muted);
  }, [stream, muted]);

  return <PersonalScreen width={width} height={height} ref={ref} autoPlay />;
};

export default Video;
