import { useNavigate } from "@tanstack/react-router";
import Join from "../components/studio/Join";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../providers/redux/store";
import Pod from "../components/studio/Pod";
import { setRoomId } from "../providers/redux/slice/User";
import { useEffect } from "react";
import { useWsContext } from "../providers/context/socket/config";
import { peerSdp } from "../service/wRTCutils";

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
      ws.addEventListener("error", wsError);
    };

    const wsOpen = () => {
      console.log("socket is connected");
      setSocket(ws);
    };

    const wsClose = () => {
      console.log("socket is disconnected");
      ws.close();
      reconnectTimer = setTimeout(connectWS, 4000);
    };

    const wsError = (err: Event) => {
      console.log("socket error", err);
    };

    connectWS();
    //clean up
    return () => {
      ws.removeEventListener("open", wsOpen);
      ws.removeEventListener("close", wsClose);
      ws.removeEventListener("error", wsError);
      ws.close();
      clearTimeout(reconnectTimer);
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

      <button onClick={() => console.log(peerSdp)}>show RTC</button>
    </>
  );
};

export default Room;

// https://riverside.fm/studio/roshan-anands-studio-NT4ri?t=df3e553361086a5ce319
// https://riverside.fm/studio/roshan-anands-studio-NT4ri
