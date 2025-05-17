import { useSelector } from "react-redux";
import { useWsContext } from "../providers/context/socket/config";
import type { wsEvent } from "../utils/Type";
import type { RootState } from "../providers/redux/store";

const useWsEmitService = () => {
  const { socket } = useWsContext();
  const { name, roomId, email } = useSelector((state: RootState) => state.user);

  //to send data to the ws server
  const wsEmit = (data: wsEvent) => {
    if (!socket || socket.readyState !== WebSocket.OPEN) {
      console.error("WebSocket is not connected");
      return;
    }
    socket.send(JSON.stringify(data));
  };

  //to create a room
  const createRoom = () => {
    const payload: wsEvent = {
      event: "create:room",
      data: {
        name: name!,
        email: email!,
      },
    };
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

  const sendOffer = (offer: RTCSessionDescriptionInit) => {
    const payload: wsEvent = {
      event: "send:offer",
      data: {
        roomID: roomId!,
        offer,
      },
    };
    wsEmit(payload);
  };

  return { createRoom, joinRoom, sendOffer };
};

export default useWsEmitService;
