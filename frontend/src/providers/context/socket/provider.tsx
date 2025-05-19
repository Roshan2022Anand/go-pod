import type React from "react";
import { SocketContext } from "./config";
import { useState } from "react";
import useWsListenService from "../../../service/wsListen";

const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useWsListenService(socket);

  return (
    <SocketContext.Provider value={{ socket, setSocket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
