import type React from "react";
import { useState } from "react";
import { WrtcContext } from "./config";
import type { RemoteStreamT } from "../../../lib/Type";

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [peerC, setPeerC] = useState<RTCPeerConnection | null>(null);
  const [myStream, setMyStream] = useState<MediaStream | null>(null);
  const [myScreen, setMyScreen] = useState<MediaStream | null>(null);
  const [remoteStreams, setRemoteStreams] = useState<RemoteStreamT>(new Map());
  const [audioOpt, setAudioOpt] = useState<MediaDeviceInfo[]>([]);
  const [videoOpt, setVideoOpt] = useState<MediaDeviceInfo[]>([]);

  return (
    <WrtcContext.Provider
      value={{
        peerC,
        setPeerC,
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
