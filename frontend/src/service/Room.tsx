import { useSelector } from "react-redux";
import { useMyContext } from "../utils/context/Mycontext";
import type { RootState } from "../redux/store";

const useRoomService = () => {
  const { wsEmitEv } = useMyContext();

  const { name, email } = useSelector((state: RootState) => state.user);

  //to emite ctreate room event
  const createRoom = () => {
    const payload = {
      event: "create:room",
      data: {
        name: name!,
        email: email!,
      },
    };
    wsEmitEv(payload);
  };

  //to emite join room event
  const joinRoom = (roomId: string) => {
    const payload = {
      event: "join:room",
      data: {
        roomId,
        name: name!,
        email: email!,
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
