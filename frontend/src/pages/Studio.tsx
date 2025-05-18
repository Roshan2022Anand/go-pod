import { useNavigate } from "@tanstack/react-router";
import Join from "../components/studio/Join";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../providers/redux/store";
import Pod from "../components/studio/Pod";
import { setRoomId } from "../providers/redux/slice/User";
import { useEffect } from "react";
import { useWsContext } from "../providers/context/socket/config";

const Room = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setSocket, socket } = useWsContext();
  const { roomId } = useSelector((state: RootState) => state.user);

  const handleExitRoom = () => {
    if (roomId) dispatch(setRoomId(null));
    navigate({ to: "/" });
  };

  //to connect to the socket server
  useEffect(() => {
    let ws: WebSocket;
    let reconnectTimer: ReturnType<typeof setTimeout>;

    //to connect ws
    const connectWS = () => {
      ws = new WebSocket("ws://localhost:8080/ws");
      ws.addEventListener("open", wsOpen);
      ws.addEventListener("close", wsClose);
    };

    const wsOpen = () => {
      console.log("socket is connected");
      setSocket(ws);
    };

    const wsClose = () => {
      console.log("socket is disconnected");
      setSocket(null);
      reconnectTimer = setTimeout(connectWS, 4000);
    };

    connectWS();
    //clean up
    return () => {
      ws.removeEventListener("open", wsOpen);
      ws.removeEventListener("close", wsClose);
      ws.close();
      clearTimeout(reconnectTimer);
      setSocket(null);
    };
  }, [setSocket]);

  return (
    <>
      <button onClick={handleExitRoom}>Back</button>
      {socket?.readyState != 1 ? (
        <div>Wait a minute ...</div>
      ) : (
        <>{roomId ? <Pod /> : <Join />}</>
      )}
    </>
  );
};

export default Room;

// https://riverside.fm/studio/roshan-anands-studio-NT4ri?t=df3e553361086a5ce319
// https://riverside.fm/studio/roshan-anands-studio-NT4ri
