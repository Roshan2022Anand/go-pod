import type React from "react";
import { SocketContext } from "./config";
import { useCallback, useEffect, useRef, useState } from "react";
import useWsListenService from "../../../service/wsListen";
import type { wsEvent } from "../../../utils/Type";

const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    socketRef.current = socket;
  }, [socket]);

  useWsListenService(socket);

  // Create a stable reference for wsEmit that won't change between renders
  const wsEmit = useCallback((data: wsEvent) => {
    console.log("sending data to ws server", data);

    if (!socketRef.current) {
      console.error("WebSocket is null - unable to send message");
      return;
    }

    if (socketRef.current.readyState !== WebSocket.OPEN) {
      console.error(
        `WebSocket is not open (state: ${socketRef.current.readyState})`
      );
      return;
    }

    try {
      socketRef.current.send(JSON.stringify(data));
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }, []); // E

  return (
    <SocketContext.Provider value={{ socket, wsEmit, setSocket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
