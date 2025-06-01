import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";
import { Button } from "../ui/button";
import { useState } from "react";
import { BsCameraVideoFill, BsCameraVideoOffFill } from "react-icons/bs";

const ControlerMic = ({
  stream,
  className,
}: {
  stream: MediaStream;
  className?: string;
}) => {
  const [isEnabled, setIsEnabled] = useState(
    stream.getAudioTracks()[0].enabled
  );
  return (
    <Button
      className={`h-full ${className || ''}`}
      onClick={() => {
        stream.getAudioTracks().forEach((track) => {
          track.enabled = !track.enabled;
        });
        setIsEnabled(!isEnabled);
      }}
    >
      {isEnabled ? (
        <FaMicrophone className="icon-md mx-auto" />
      ) : (
        <FaMicrophoneSlash className="icon-md mx-auto" />
      )}
    </Button>
  );
};

const ControlerCamera = ({
  stream,
  className,
}: {
  stream: MediaStream;
  className?: string;
}) => {
  const [isEnabled, setIsEnabled] = useState(
    stream.getVideoTracks()[0].enabled
  );
  return (
    <Button
      className={`h-full ${className || ''}`}
      onClick={async () => {
        stream.getVideoTracks().forEach((track) => {
          track.enabled = !track.enabled;
        });
        setIsEnabled(!isEnabled);
      }}
    >
      {isEnabled ? (
        <BsCameraVideoFill className="icon-md mx-auto" />
      ) : (
        <BsCameraVideoOffFill className="icon-md mx-auto" />
      )}
    </Button>
  );
};

export { ControlerMic, ControlerCamera };
