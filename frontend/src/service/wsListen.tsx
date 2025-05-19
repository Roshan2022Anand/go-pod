import { useEffect } from "react";
import type { WsData, wsEvent } from "../utils/Type";
import { useDispatch } from "react-redux";
import { setRoomId } from "../providers/redux/slice/User";
import { toast } from "react-toastify";
import useWRTCservice from "./wRTCutils";

const useWsListenService = (ws: WebSocket | null) => {
  const dispatch = useDispatch();
  const { initOffer } = useWRTCservice();

  useEffect(() => {
    //on successful creation
    const roomCreated = (data: WsData) => {
      dispatch(setRoomId(data.roomId));
      toast.success("Room created successfully");
    };

    //on successful join
    const joinRoom = (data: WsData) => {
      dispatch(setRoomId(data.roomId));
      toast.success("Joined room successfully");
    };

    //on new client joining
    const newClient = (data: WsData) => {
      const name = data.name;
      const email = data.email;
      initOffer(ws, email as string); // send offer to the new client
      toast.success(`${name}-${email} joined the room`);
    };

    //on offer received
    const offerReceived = (data: WsData) => {
      const offer: RTCSessionDescriptionInit = JSON.parse(data.offer as string);
      const email = data.from;
      console.log("received ", offer, " form ", email);
    };

    if (!ws) return;

    const wsMsg = (event: MessageEvent) => {
      const ev: wsEvent = JSON.parse(event.data);

      switch (ev.event) {
        case "room:created":
          roomCreated(ev.data);
          break;
        case "room:joined":
          joinRoom(ev.data);
          break;
        case "room:newclient":
          newClient(ev.data);
          break;
        case "receive:offer":
          offerReceived(ev.data);
          break;
        case "error":
          toast.error(ev.data.msg as string);
          break;
        default:
          console.error("Unknown event type:", ev.event);
      }
    };

    ws.addEventListener("message", wsMsg);
    return () => {
      ws.removeEventListener("message", wsMsg);
    };
  }, [ws, dispatch, initOffer]);
};

export default useWsListenService;
