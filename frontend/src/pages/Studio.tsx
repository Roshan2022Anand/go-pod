import { useNavigate } from "@tanstack/react-router";
import Join from "../components/studio/Join";
import { useDispatch, useSelector } from "react-redux";
import Pod from "../components/studio/Pod";
import ConnectWs from "../config/socket";
import type { StateT } from "../providers/redux/store";
import { setRoomId } from "../providers/redux/slice/room";
import { useMyContext } from "../providers/context/config";

const Room = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { socket } = useMyContext();
  const { roomID } = useSelector((state: StateT) => state.room);

  const handleExitRoom = () => {
    if (roomID) dispatch(setRoomId(null));
    navigate({ to: "/" });
  };

  ConnectWs();

  return (
    <>
      <button onClick={handleExitRoom}>Back</button>
      {!socket ? (
        <div>Wait a minute ...</div>
      ) : (
        <>{roomID ? <Pod /> : <Join />}</>
      )}
    </>
  );
};

export default Room;

// https://riverside.fm/studio/roshan-anands-studio-NT4ri?t=df3e553361086a5ce319
// https://riverside.fm/studio/roshan-anands-studio-NT4ri
