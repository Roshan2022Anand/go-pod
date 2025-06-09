import type React from "react";
import { useEffect, useRef, useState } from "react";
import { WsContext } from "./config";
import type { WsData } from "@/lib/Type";

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  const listeners = useRef<Map<string, () => void>>(new Map());

  //to add event listeners for WebSocket events
  const wsOn = (event: string, callback: () => void) => {
    listeners.current.set(event, callback);
  };

  //to remove event listeners for WebSocket events
  const wsOff = (event: string) => {
    listeners.current.delete(event);
  };

  const wsEmit = (event: string, data: WsData) => {
    if (!socket) return;
    socket.send(JSON.stringify({ event, data }));
  };

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    let ws: WebSocket;
    const connect = () => {
      ws = new WebSocket(import.meta.env.VITE_BACKEND_URL + "/ws");
      ws.addEventListener("open", wsOpen);
      ws.addEventListener("close", wsClose);
      ws.addEventListener("error", wsError);
      ws.addEventListener("message", wsMessage);
    };

    const wsOpen = () => {
      console.log("WebSocket connection opened");
      setSocket(ws);
    };

    const wsClose = () => {
      console.log("WebSocket connection closed");
      timer = setTimeout(() => {
        console.log("reconnecting ....");
        connect();
      }, 4000);
    };

    const wsError = (err: Event) => {
      console.error("WebSocket error:", err);
      setSocket(null);
    };

    const wsMessage = (event: MessageEvent) => {
      console.log("WebSocket message received:", event.data);
    };

    connect();

    return () => {
      ws.removeEventListener("open", wsOpen);
      ws.removeEventListener("close", wsClose);
      ws.removeEventListener("error", wsError);
      ws.removeEventListener("message", wsMessage);
      ws.close();
      clearTimeout(timer);
      console.log("WebSocket connection closed and cleanup done");
    };
  }, []);

  return (
    <WsContext.Provider
      value={{
        socket,
        setSocket,
        wsOn,
        wsOff,
        wsEmit,
        listeners: listeners.current,
      }}
    >
      {children}
    </WsContext.Provider>
  );
};

export default ContextProvider;
