import { BiUser } from "react-icons/bi";
import ReactPlayer from "react-player";

const Player = ({
  stream,
  user,
}: {
  stream: MediaStream | null;
  user: string;
}) => {
  return (
    <>
      <p>{user}</p>
      {stream ? (
        <ReactPlayer url={stream} playing height="200px" width="200px" muted />
      ) : (
        <div className="size-[200px] rounded-md bg-pink-400 ">
          <BiUser className="icon-md" />
        </div>
      )}
    </>
  );
};

export default Player;
