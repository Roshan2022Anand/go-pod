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
    <figure className="relative">
      <p className="absolute bottom-0 right-0 m-2">{user}</p>
      {stream ? (
        <ReactPlayer url={stream} width="300px" height="300px" playing muted />
      ) : (
        <div className="size-[200px] rounded-md bg-orange-300 flex items-center justify-center">
          <BiUser className="icon-lg border-4 rounded-full" />
        </div>
      )}
    </figure>
  );
};

export default Player;
