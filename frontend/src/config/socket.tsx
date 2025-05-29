import { io } from "socket.io-client";
import { useEffect } from "react";
import { useMyContext } from "../providers/context/config";

const ConnectWs = () => {
  const { setSocket } = useMyContext();
  useEffect(() => {
    const ws = io(import.meta.env.VITE_NODE_URL);
    if (!ws) return;
    setSocket(ws);
    return () => {
      ws.disconnect();
    };
  }, [setSocket]);
};

export default ConnectWs;
