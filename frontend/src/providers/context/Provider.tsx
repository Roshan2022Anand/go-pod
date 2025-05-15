import { useState } from "react";
import { MyContext } from "./Socket";

export const MyContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [peerConn, setPeerConn] =
    useState<RTCPeerConnection | null>(null);

  return (
    <MyContext.Provider
      value={{
        socket,
        setSocket,
        peerConn,
        setPeerConn,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
