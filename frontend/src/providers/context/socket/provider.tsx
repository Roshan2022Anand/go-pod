import type React from "react";
import { useState } from "react";
import { WsContext } from "./config";
import type { wsEvent } from "@/lib/Type";

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  const WsEmit = (data: wsEvent) => {
    if (!socket) return;
    socket.send(JSON.stringify(data));
  };

  return (
    <WsContext.Provider
      value={{
        socket,
        setSocket,
        WsEmit,
      }}
    >
      {children}
    </WsContext.Provider>
  );
};

export default ContextProvider;
