import type React from "react";
import { useEffect, useRef, useState } from "react";
import { WsContext } from "./config";
import type { WsData, wsEvent } from "@/lib/Type";

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  const listeners = useRef<Map<string, (data: WsData) => void>>(new Map());

  const WsOn = (ev: string, cb: (data: WsData) => void) => {
    if (!listeners.current) return;
    listeners.current.set(ev, cb);
  };

  const WsOff = (ev: string) => {
    if (!listeners.current) return;
    listeners.current.delete(ev);
  };

  const WsEmit = (data: wsEvent) => {
    if (!socket) return;
    socket.send(JSON.stringify(data));
  };

  useEffect(() => {
    if (!socket) return;

    const wsMsg = (event: MessageEvent) => {
      const ev: wsEvent = JSON.parse(event.data);
      if (!listeners.current) return;

      const callback = listeners.current.get(ev.event);
      if (callback) {
        callback(ev.data);
      } else {
        console.warn(`No listener for event: ${ev.event}`);
      }
    };

    socket.addEventListener("message", wsMsg);

    return () => {
      socket.removeEventListener("message", wsMsg);
    };
  }, [socket]);

  return (
    <WsContext.Provider
      value={{
        socket,
        setSocket,
        WsEmit,
        WsOn,
        WsOff,
        listeners: listeners.current,
      }}
    >
      {children}
    </WsContext.Provider>
  );
};

export default ContextProvider;
