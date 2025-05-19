import { useSelector } from "react-redux";
import type { wsEvent } from "../utils/Type";
import type { RootState } from "../providers/redux/store";

const useWsEmitService = () => {
  const { name, roomId, email } = useSelector((state: RootState) => state.user);

  // Create a stable reference for wsEmit that won't change between renders
  const wsEmit = (socket: WebSocket | null, data: wsEvent) => {
    if (!socket) {
      console.error("WebSocket is ", socket);
      return;
    }

    if (socket.readyState !== WebSocket.OPEN) {
      console.error(`WebSocket is not open (state: ${socket.readyState})`);
      return;
    }

    socket.send(JSON.stringify(data));
  };

  //to create a room
  const createRoom = (ws: WebSocket | null) => {
    const payload: wsEvent = {
      event: "create:room",
      data: {
        name: name!,
        email: email!,
      },
    };
    wsEmit(ws, payload);
  };

  //to join a room
  const joinRoom = async (ws: WebSocket | null, id: string) => {
    const payload: wsEvent = {
      event: "join:room",
      data: {
        name: name!,
        email: email!,
        roomID: id,
      },
    };
    wsEmit(ws, payload);
  };

  //to send offer to the new client
  const sendOffer = (
    ws: WebSocket | null,
    offer: RTCSessionDescriptionInit,
    email: string
  ) => {
    const payload: wsEvent = {
      event: "send:offer",
      data: {
        roomID: roomId!,
        offer: JSON.stringify(offer),
        from: email,
      },
    };
    wsEmit(ws, payload);
  };

  return { createRoom, joinRoom, sendOffer };
};

export default useWsEmitService;
