import type { StateT } from "@/providers/redux/store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setRoomId } from "@/providers/redux/slice/room";
import { useMyContext } from "@/providers/context/config";
import { peers } from "@/service/wRTC";
import { useNavigate } from "@tanstack/react-router";

const useStudio = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { roomID } = useSelector((state: StateT) => state.room);
  const { myScreen, myStream, setMyStream } = useMyContext();

  const leaveStudio = () => {
    if (roomID) dispatch(setRoomId(null));

    //stop the local stream
    if (myStream) {
      myStream.getTracks().forEach((track) => {
        track.stop();
      });
      setMyStream(null);

      //disconnect all the peers
      for (const i in peers) {
        peers.get(i)?.close();
        peers.delete(i);
      }
    }

    //disconnect the screen share
    if (myScreen) {
      myScreen.getTracks().forEach((track) => {
        track.stop();
      });
      setMyStream(null);
    }
    navigate({ to: "/dashboard" });
  };

  return { leaveStudio };
};
export default useStudio;
