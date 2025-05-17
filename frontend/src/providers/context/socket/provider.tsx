import type React from "react";
import { SocketContext } from "./config";
import { useEffect, useState } from "react";
import useWsListenService from "../../../service/wsListen";

const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useWsListenService(socket);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080/ws");

    const wsOpen = () => {
      console.log("socket is connected");
      setSocket(ws);
    };

    ws.addEventListener("open", wsOpen);

    return () => {
      ws.removeEventListener("open", wsOpen);
      ws.close();
      console.log("socket is disconnected");
      setSocket(null);
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
