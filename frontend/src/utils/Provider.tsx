import { useCallback, useState } from "react";
import { MyContext } from "./Mycontext";

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

    ws.onclose = () => {
      console.log("WebSocket is closed now.");
      setSocket(null);
      setIsSocketReady(false);
    };

    ws.onerror = (error) => {
      console.error("WebSocket error observed:", error);
    };
  }, [socket]);

  const sendMsg = useCallback(() => {
    if (!socket || socket.readyState !== WebSocket.OPEN) {
      console.error(
        "Socket not connected",
        socket,
        socket?.readyState,
        WebSocket.OPEN
      );
      return;
    }

    const payload = {
      event: "create:room",
      msg: "hai",
    };

    console.log("sent");
    socket.send(JSON.stringify(payload));
  }, [socket]);

  return (
    <MyContext.Provider
      value={{
        socket,
        setSocket,
        isSocketReady,
        setIsSocketReady,
        connectSocket,
        sendMsg,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
