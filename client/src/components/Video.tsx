import { useEffect, useRef } from "react";
import { PersonalScreen } from "pages/Room";

interface Props {
  width: string;
  height: string;
  stream: MediaStream;
  muted?: boolean;
}

const Video = ({ width, height, stream, muted }: Props) => {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (ref.current) ref.current.srcObject = stream;
  }, [stream, muted]);

  return <PersonalScreen width={width} height={height} ref={ref} autoPlay />;
};

export default Video;
