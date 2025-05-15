import { createContext, useContext } from "react";
import type { Dispatch, SetStateAction } from "react";

type ContextT = {
  socket: WebSocket | null;
  setSocket: Dispatch<SetStateAction<WebSocket | null>>;
  peerConn: RTCPeerConnection | null;
  setPeerConn: Dispatch<SetStateAction<RTCPeerConnection | null>>;
};

export const MyContext = createContext<ContextT>({
  socket: null,
  setSocket: () => {},
  peerConn: null,
  setPeerConn: () => {},
});

export const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error(
      "useMyContext must be used within a SocketContextProvider"
    );
  }
  return context;
};
