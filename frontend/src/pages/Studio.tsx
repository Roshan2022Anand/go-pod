import { useNavigate } from "@tanstack/react-router";
import Join from "../components/studio/Join";
import { useDispatch, useSelector } from "react-redux";
import Pod from "../components/studio/Pod";
import type { StateT } from "../providers/redux/store";
import { setRoomId } from "../providers/redux/slice/room";
import { useMyContext } from "../providers/context/config";
import { IoMdArrowBack } from "react-icons/io";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
const Studio = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setSocket } = useMyContext();
  const { roomID } = useSelector((state: StateT) => state.room);

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

  //to exit the pod
  const handleExitRoom = () => {
    if (roomID) dispatch(setRoomId(null));
    navigate({ to: "/" });
  };

  return (
    <main className="h-screen flex flex-col">
      <button onClick={handleExitRoom}>
        <IoMdArrowBack className="icon-md" />
      </button>
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
