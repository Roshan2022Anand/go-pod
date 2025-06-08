import { Button } from "../ui/button";
import { useState } from "react";
import { useMyContext } from "@/providers/context/config";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from "../ui/select";
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";
import { BsCameraVideoFill, BsCameraVideoOffFill } from "react-icons/bs";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import { LuScreenShare } from "react-icons/lu";

//to show available audio and video devices and allow user to select them
const SetupMedia = ({ stream }: { stream: MediaStream }) => {
  const { audioOpt, videoOpt, setMyStream } = useMyContext();

  //to set the new selected audio track
  const handleAudioChange = async (deviceId: string) => {
    console.log("audio change", deviceId);
    stream.getAudioTracks()[0].stop();
    stream.getAudioTracks()[0].enabled = false;

    // Get new audio track
    const newAudioStream = await navigator.mediaDevices.getUserMedia({
      audio: { deviceId },
    });
    const newAudioTrack = newAudioStream.getAudioTracks()[0];
    const currentVideoTrack = stream.getVideoTracks()[0];
    const newStream = new MediaStream([newAudioTrack, currentVideoTrack]);
    setMyStream(newStream);
  };

  //to set the new selected video track
  const handleVideoChange = async (deviceId: string) => {
    stream.getVideoTracks()[0].stop();
    stream.getVideoTracks()[0].enabled = false;

    // Get new video track
    const newVideoStream = await navigator.mediaDevices.getUserMedia({
      video: { deviceId },
    });
    const newVideoTrack = newVideoStream.getVideoTracks()[0];
    const currentAudioTrack = stream.getAudioTracks()[0];
    const newStream = new MediaStream([currentAudioTrack, newVideoTrack]);
    setMyStream(newStream);
  };

  return (
    <figure className="flex flex-col py-2 gap-2 [&>*]:bg-bg-sec [&>*]:rounded-sm">
      {/* audio select */}
      <Select
        value={stream.getAudioTracks()[0].getSettings().deviceId}
        onValueChange={handleAudioChange}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select Microphone" />
        </SelectTrigger>
        <SelectContent className="bg-bg-sec">
          {audioOpt.map((d) => (
            <SelectItem value={d.deviceId} key={d.deviceId}>
              <FaMicrophone /> {d.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Video Select */}
      <Select
        value={stream.getVideoTracks()[0].getSettings().deviceId}
        onValueChange={handleVideoChange}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select Camera" />
        </SelectTrigger>
        <SelectContent className="bg-bg-sec">
          {videoOpt.map((d) => (
            <SelectItem value={d.deviceId} key={d.deviceId}>
              <BsCameraVideoFill /> {d.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </figure>
  );
};

//to give control over mic to enable/disable it
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
    <Button className={`flex items-center gap-2 ${className || ""}`}>
      <div
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
      </div>
    </Button>
  );
};

//to give control over camera to enable/disable it
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
    <Button className={`flex items-center gap-2 ${className || ""}`}>
      <div
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
      </div>
    </Button>
  );
};

//to give control over speaker to enable/disable it
const ControlerSpeaker = ({ className }: { className?: string }) => {
  const [isEnabled, setIsEnabled] = useState(true);
  return (
    <Button
      className={className}
      variant={"prime"}
      onClick={() => {
        setIsEnabled(!isEnabled);
      }}
    >
      {isEnabled ? (
        <HiSpeakerWave className="icon-md" />
      ) : (
        <HiSpeakerXMark className="icon-md mx-auto" />
      )}
    </Button>
  );
};

//to give control over screen share
const ControlerScreenShare = () => {
  const { setMyScreen } = useMyContext();

  const handleScreenShare = async () => {
    const stream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
    });

    setMyScreen(stream);
    stream.getVideoTracks()[0].addEventListener("ended", () => {
      setMyScreen(null);
    });
  };

  return (
    <Button variant={"prime"} onClick={handleScreenShare}>
      <LuScreenShare className="icon-md" />
    </Button>
  );
};

export {
  ControlerMic,
  ControlerCamera,
  ControlerSpeaker,
  ControlerScreenShare,
  SetupMedia,
};
