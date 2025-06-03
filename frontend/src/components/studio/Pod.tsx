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
  const { roomID } = useSelector((state: StateT) => state.room);
  const { email } = useSelector((state: StateT) => state.user);
  const { remoteStreams, myStream } = useMyContext();
  const { leaveStudio } = useStudio();

  const count = remoteStreams.size + 1;
  const columns = count == 1 ? 1 : count <= 3 ? 2 : Math.ceil(count / 2);
  const gridCols = `grid-cols-${columns}`;

  const handleCopy = async () => {
    const currUrl = window.location.href;
    const cpLink = currUrl + "?rID=" + roomID;
    await navigator.clipboard.writeText(cpLink);
    toast.success("Link copied to clipboard!");
  };

  return (
    <main className="grow flex px-2">
      <section className="grow flex flex-col">
        <figure className={`grow p-5 grid ${gridCols} gap-1`}>
          <Player
            stream={myStream}
            user={email as string}
            className={`${count % 2 !== 0 ? "row-span-2" : ""
              } border-2 border-accent`}
          />
          {Array.from(remoteStreams.entries()).map(([email, stream]) => (
            <Player stream={stream} user={email} key={email} />
          ))}
        </figure>
        <figure className="mx-auto p-2 rounded-md mb-2 flex gap-3 items-center [&>*]:rounded-full [&>*]:p-3">
          {myStream && (
            <>
              <Button variant={"destructive"} className="flex gap-1">
                <FaRecordVinyl className="icon-sm" />
                <div>record</div>
              </Button>
              <Button variant={"prime"}>
                <LuScreenShare className="icon-md" />
              </Button>
              <ControlerCamera stream={myStream} className="bg-btn-hover" />
              <ControlerMic stream={myStream} className="bg-btn-hover" />
              <Button variant={"prime"} className="h-full" onClick={handleCopy}>
                <FaCopy className="icon-md" />
              </Button>
              <Button variant={"prime"}>
                <HiSpeakerWave className="icon-md" />
              </Button>
              <Button
                variant={"prime"}
                className="h-full"
                onClick={leaveStudio}
              >
                <FcEndCall className="icon-md" />
              </Button>
            </>
          )}
        </figure>
      </section>

      <aside className="bg-bg-sec w-1/4 max-w-[200px] m-2 rounded-md flex justify-center items-center">
        aside
      </aside>
    </main>
  );
};

export default Pod;
