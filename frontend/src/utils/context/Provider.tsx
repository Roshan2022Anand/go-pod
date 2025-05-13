import { useCallback, useState } from "react";
import { MyContext } from "./Mycontext";
import type { wsEvent } from "../Type";
import { toast } from "react-toastify";

export const MyContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isSocketReady, setIsSocketReady] = useState(false);
  const connectSocket = useCallback(() => {
    if (socket) {
      console.log("Socket already connected");
      return;
    }

    const ws = new WebSocket("http://localhost:8080/ws");
    ws.onopen = () => {
      console.log("WebSocket is open now.");
      setSocket(ws);
      setIsSocketReady(true);
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Message from server: ", data);
    };

    ws.onclose = () => {
      console.log("WebSocket is closed now.");
      setSocket(null);
      setIsSocketReady(false);
    };

    ws.onerror = (error) => {
      console.error("WebSocket error observed:", error);
    };
  }, [socket]);

  const wsEmitEv = useCallback(
    (ev: wsEvent) => {
      if (!socket || socket.readyState !== WebSocket.OPEN) {
        toast.error("Socket not connected");
        return;
      }

      socket.send(JSON.stringify(ev));
    },
    [socket]
  );

  return (
    <MyContext.Provider
      value={{
        socket,
        setSocket,
        isSocketReady,
        setIsSocketReady,
        connectSocket,
        wsEmitEv,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
