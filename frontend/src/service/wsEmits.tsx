import { useSelector } from "react-redux";
import { useWsContext } from "../providers/context/socket/config";
import type { wsEvent } from "../utils/Type";
import type { RootState } from "../providers/redux/store";

const useWsEmitService = () => {
  const { wsEmit } = useWsContext();
  const { name, roomId, email } = useSelector((state: RootState) => state.user);

  //to create a room
  const createRoom = () => {
    const payload: wsEvent = {
      event: "create:room",
      data: {
        name: name!,
        email: email!,
      },
    };
    console.log("createRoom() => ", payload, wsEmit);
    wsEmit(payload);
  };

  //to join a room
  const joinRoom = async (id: string) => {
    const payload: wsEvent = {
      event: "join:room",
      data: {
        name: name!,
        email: email!,
        roomID: id,
      },
    };
    wsEmit(payload);
  };

  const sendOffer = (offer: RTCSessionDescriptionInit, email: string) => {
    const payload: wsEvent = {
      event: "send:offer",
      data: {
        roomID: roomId!,
        offer,
        from: email,
      },
    };
    console.log("sendoffer() => ", payload, wsEmit);
    wsEmit(payload);
  };

  return { createRoom, joinRoom, sendOffer };
};

export default useWsEmitService;
