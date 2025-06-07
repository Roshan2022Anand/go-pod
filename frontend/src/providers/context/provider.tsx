import type React from "react";
import { useState } from "react";
import type { Socket } from "socket.io-client";
import useWrtcService from "../../service/wRTC";
import { MyContext } from "./config";
import type { RemoteStreamT } from "../../lib/Type";

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [myStream, setMyStream] = useState<MediaStream | null>(null);
  const [myScreen, setMyScreen] = useState<MediaStream | null>(null);
  const [remoteStreams, setRemoteStreams] = useState<RemoteStreamT>(new Map());
  const [audioOpt, setAudioOpt] = useState<MediaDeviceInfo[]>([]);
  const [videoOpt, setVideoOpt] = useState<MediaDeviceInfo[]>([]);

  useWrtcService(socket, myStream, setRemoteStreams);
  return (
    <MyContext.Provider
      value={{
        socket,
        setSocket,
        myStream,
        setMyStream,
        remoteStreams,
        setRemoteStreams,
        audioOpt,
        setAudioOpt,
        videoOpt,
        setVideoOpt,
        myScreen,
        setMyScreen,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export default ContextProvider;
