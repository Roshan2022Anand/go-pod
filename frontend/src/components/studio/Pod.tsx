import { useSelector } from "react-redux";
import type { StateT } from "../../providers/redux/store";
import { useMyContext } from "../../providers/context/config";
import Player from "./Player";
import { ControlerCamera, ControlerMic } from "./MediaUtils";
import { FaCopy } from "react-icons/fa";
import { Button } from "../ui/button";
import { toast } from "react-toastify";

const Pod = () => {
  const { roomID, studioID } = useSelector((state: StateT) => state.room);
  const { remoteStreams, myStream } = useMyContext();

  const handleCopy = async () => {
    const cpLink =
      "http://localhost:5173/studio/" + studioID + "?rID=" + roomID;
    await navigator.clipboard.writeText(cpLink);
    toast.success("Link copied to clipboard!");
  };
  return (
    <main className="grow flex flex-col">
      <div className="text-[20px] text-green-400">{roomID}</div>
      <section className="grow ">
        <Player stream={myStream} user="you" />
        {Array.from(remoteStreams.entries()).map(([email, stream]) => (
          <Player stream={stream} user={email} key={email} />
        ))}
      </section>
      <section className="h-[70px] border-2 w-1/3 mx-auto rounded-md mb-2 flex  justify-center">
        {myStream && (
          <>
            <ControlerCamera stream={myStream} className="w-1/3 " />
            <ControlerMic stream={myStream} className="w-1/3" />
            <Button className="h-full" onClick={handleCopy}>
              <FaCopy className="icon-md" />
            </Button>
          </>
        )}
      </section>
    </main>
  );
};

export default Pod;
