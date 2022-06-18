import { useEffect, useRef, useState } from "react";
import { PersonalScreen } from "pages/Room";

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
