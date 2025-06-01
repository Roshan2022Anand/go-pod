import Join from "../components/studio/Join";
import { useSelector } from "react-redux";
import Pod from "../components/studio/Pod";
import type { StateT } from "../providers/redux/store";
import { useMyContext } from "../providers/context/config";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import useAuth from "@/hooks/auth";
import Loading from "@/Loading";
import { StudioNav } from "@/components/studio/Nav";

const Studio = () => {
  useAuth();
  const { setSocket } = useMyContext();
  const { roomID } = useSelector((state: StateT) => state.room);
  const { name, email } = useSelector((state: StateT) => state.user);
  const [isConnected, setIsConnected] = useState(false);

  //connect to WS
  useEffect(() => {
    const ws = io(import.meta.env.VITE_NODE_URL);
    setSocket(ws);

    const onConnect = () => {
      setIsConnected(true);
    };

    const onDisconnect = () => {
      setIsConnected(false);
    };
    ws.on("connect", onConnect);
    ws.on("disconnect", onDisconnect);

    return () => {
      ws.off("connect", onConnect);
      ws.off("disconnect", onDisconnect);
      ws.disconnect();
    };
  }, [setSocket]);

  if (!name || !email) return <Loading />;

  return (
    <main className="h-screen flex flex-col">
      <StudioNav />
      {isConnected ? (
        <>{roomID ? <Pod /> : <Join />}</>
      ) : (
        <h3 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          Cooking your connection...
        </h3>
      )}
    </main>
  );
};

export default Studio;

// https://riverside.fm/studio/roshan-anands-studio-NT4ri?t=df3e553361086a5ce319
// https://riverside.fm/studio/roshan-anands-studio-NT4ri

/**
if studioID is not valid, then 404 page
the studioID is store in DB for any users to access 
 */
