import { useSelector } from "react-redux";
import type { StateT } from "../../providers/redux/store";
import { useMyContext } from "../../providers/context/config";
import Player from "./Player";
import { ControlerCamera, ControlerMic } from "./MediaUtils";
import { Button } from "../ui/button";
import { toast } from "react-toastify";
import useStudio from "@/hooks/studio";
import { FaRecordVinyl, FaCopy } from "react-icons/fa";
import { FcEndCall } from "react-icons/fc";
import { HiSpeakerWave } from "react-icons/hi2";
import { LuScreenShare } from "react-icons/lu";

const Pod = () => {
  const { roomID, studioID } = useSelector((state: StateT) => state.room);
  const { remoteStreams, myStream } = useMyContext();
  const { leaveStudio } = useStudio();

  const count = remoteStreams.size + 1;
  const columns = count == 1 ? 1 : count <= 3 ? 2 : Math.ceil(count / 2);

  const handleCopy = async () => {
    const cpLink =
      "http://localhost:5173/studio/" + studioID + "?rID=" + roomID;
    await navigator.clipboard.writeText(cpLink);
    toast.success("Link copied to clipboard!");
  };

  return (
    <main className="grow flex flex-col">
      <section className="grow flex">
        <figure
          className={`grow p-5 grid grid-cols-${columns} gap-1`}
        >
          <Player
            stream={myStream}
            user="one"
            className={`${count % 2 !== 0 ? "row-span-2" : ""}`}
          />
          {Array.from(remoteStreams.entries()).map(([email, stream]) => (
            <Player stream={stream} user={email} key={email} />
          ))}
        </figure>
        <aside className="w-1/4 border-2 flex justify-center items-center">
          aside
        </aside>
      </section>
      <section className="border-2 mx-auto p-2 rounded-md mb-2 flex gap-3 items-center">
        {myStream && (
          <>
            <Button className="flex gap-1 bg-red-400 ">
              <FaRecordVinyl className="icon-sm text-red-500" />
              <div>record</div>
            </Button>
            <Button>
              <LuScreenShare className="icon-md" />
            </Button>
            <ControlerCamera stream={myStream} />
            <ControlerMic stream={myStream} />
            <Button className="h-full" onClick={handleCopy}>
              <FaCopy className="icon-md" />
            </Button>
            <Button className="h-full" onClick={leaveStudio}>
              <FcEndCall className="icon-md" />
            </Button>
            <Button className="">
              <HiSpeakerWave className="icon-md" />
            </Button>
          </>
        )}
      </section>
    </main>
  );
};

export default Pod;
