import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
  display: inline-block;
  width: 240px;
  height: 270px;
  margin: 5px;
`;

const VideoContainer = styled.video`
  width: 240px;
  height: 240px;
  background-color: black;
`;

const UserLabel = styled.p`
  display: inline-block;
  position: absolute;
  top: 230px;
  left: 0px;
`;

interface Props {
  email: string;
  stream: MediaStream;
  muted?: boolean;
}

const Video = ({ email, stream, muted }: Props) => {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (ref.current) ref.current.srcObject = stream;
  }, [stream]);

  return (
    <Container>
      <VideoContainer ref={ref} autoPlay />
    </Container>
  );
};

export default Video;
