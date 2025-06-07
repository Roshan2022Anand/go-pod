import {
  createContext,
  useContext,
  type Dispatch,
  type SetStateAction,
} from "react";
import type { Socket } from "socket.io-client";
import type { RemoteStreamT } from "../../lib/Type";

type contextT = {
  socket: Socket | null;
  setSocket: Dispatch<SetStateAction<Socket | null>>;
  myStream: MediaStream | null;
  setMyStream: Dispatch<SetStateAction<MediaStream | null>>;
  remoteStreams: RemoteStreamT;
  setRemoteStreams: Dispatch<SetStateAction<RemoteStreamT>>;
  audioOpt: MediaDeviceInfo[];
  setAudioOpt: Dispatch<SetStateAction<MediaDeviceInfo[]>>;
  videoOpt: MediaDeviceInfo[];
  setVideoOpt: Dispatch<SetStateAction<MediaDeviceInfo[]>>;
  myScreen: MediaStream | null;
  setMyScreen: Dispatch<SetStateAction<MediaStream | null>>;
};

export const MyContext = createContext<contextT>({
  socket: null,
  setSocket: () => {},
  myStream: null,
  setMyStream: () => {},
  remoteStreams: new Map(),
  setRemoteStreams: () => {},
  audioOpt: [],
  setAudioOpt: () => {},
  videoOpt: [],
  setVideoOpt: () => {},
  myScreen: null,
  setMyScreen: () => {},
});

export const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error("inter error");
  }
  return context;
};
