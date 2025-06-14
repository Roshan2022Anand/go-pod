import type React from "react";
import { useCallback, useEffect, useState } from "react";
import { WrtcContext } from "./config";
import type { RemoteStreamT, wsEvent } from "../../../lib/Type";
import { useWsContext } from "../socket/config";

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [peerC, setPeerC] = useState<RTCPeerConnection | null>(null);
  const [myStream, setMyStream] = useState<MediaStream | null>(null);
  const [myScreen, setMyScreen] = useState<MediaStream | null>(null);
  const [remoteStreams, setRemoteStreams] = useState<RemoteStreamT>(new Map());
  const [audioOpt, setAudioOpt] = useState<MediaDeviceInfo[]>([]);
  const [videoOpt, setVideoOpt] = useState<MediaDeviceInfo[]>([]);

  const { WsEmit } = useWsContext();

  const MediaProposal = useCallback(
    (id: string, kind: string) => {
      const payload: wsEvent = {
        event: "proposal",
        data: {
          id,
          kind,
        },
      };

      WsEmit(payload);
    },
    [WsEmit]
  );

  //to send user's media stream to the server
  useEffect(() => {
    if (!peerC || !myStream) return;
    myStream.getTracks().forEach((t) => {
      console.log("sending camera track");
      MediaProposal(t.id, "camera");
      peerC.addTrack(t, myStream);
    });
  }, [peerC, myStream, MediaProposal]);

  useEffect(() => {
    if (!peerC || !myScreen) return;
    myScreen.getTracks().forEach((t) => {
      console.log("sending screen track");
      MediaProposal(t.id, "screen");
      peerC.addTrack(t, myScreen);
    });
  }, [peerC, myScreen, MediaProposal]);

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
