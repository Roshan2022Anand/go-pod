import { useSelector } from "react-redux";
import type { StateT } from "../../providers/redux/store";
import { useMyContext } from "../../providers/context/config";
import Player from "./Player";

const Pod = () => {
  const { roomID } = useSelector((state: StateT) => state.room);
  const { remoteStreams, myStream } = useMyContext();
  console.log("remoteStreams", remoteStreams);
  return (
    <>
      <div className="text-[20px] text-green-400">{roomID}</div>
      <Player stream={myStream} user="you" />
      {Array.from(remoteStreams.entries()).map(([email, stream]) => (
        <Player stream={stream} user={email} />
      ))}
    </>
  );
};

export default Pod;
