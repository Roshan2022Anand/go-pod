import {
  createContext,
  useContext,
  type Dispatch,
  type SetStateAction,
} from "react";

type contextT = {
  peerC: RTCPeerConnection | null;
  setPeerC: Dispatch<SetStateAction<RTCPeerConnection | null>>;
  //   localStream: MediaStream | null;
  //   remoteStream: MediaStream | null;
  //   localVideoRef: React.RefObject<HTMLVideoElement>;
  //   remoteVideoRef: React.RefObject<HTMLVideoElement>;
};

export const WebRTCContext = createContext<contextT>({
  peerC: null,
  setPeerC: () => {},
  //   localStream: null,
  //   remoteStream: null,
  //   localVideoRef: null,
  //   remoteVideoRef: null,
});

export const useWRTCContext = () => {
  const context = useContext(WebRTCContext);
  if (!context) {
    throw new Error("inter error");
  }
  return context;
};
