import { useSelector } from "react-redux";
import type { RootState } from "../../providers/redux/store";
import useSocketService from "./Config";

const useRoomService = () => {
  const { wsEmitEv } = useSocketService();

  const { name } = useSelector((state: RootState) => state.user);

  //to emite ctreate room event
  const createRoom = () => {
    const payload = {
      event: "create:room",
      data: {
        name: name!,
        // pic: pic!,
        // email: email!,
      },
    };
    wsEmitEv(payload);
  };

  //to emite join room event
  const joinRoom = (roomID: string) => {
    const payload = {
      event: "join:room",
      data: {
        roomID,
        name: name!,
        // pic: pic!,
        // email: email!,
      },
    };
    wsEmitEv(payload);
  };

  return {
    createRoom,
    joinRoom,
  };
};

export default useRoomService;
