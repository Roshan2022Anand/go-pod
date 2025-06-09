import type React from "react";
import { useState } from "react";
import { WrtcContext } from "./config";
import type { RemoteStreamT } from "../../../lib/Type";

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [myStream, setMyStream] = useState<MediaStream | null>(null);
  const [myScreen, setMyScreen] = useState<MediaStream | null>(null);
  const [remoteStreams, setRemoteStreams] = useState<RemoteStreamT>(new Map());
  const [audioOpt, setAudioOpt] = useState<MediaDeviceInfo[]>([]);
  const [videoOpt, setVideoOpt] = useState<MediaDeviceInfo[]>([]);

  return (
    <WrtcContext.Provider
      value={{
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
    </WrtcContext.Provider>
  );
};

export default ContextProvider;
