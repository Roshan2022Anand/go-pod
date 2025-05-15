import { toast } from "react-toastify";
import type { wsEvent } from "../../utils/Type";
import { useMyContext } from "../../providers/context/Socket";
import useListenService from "./Listen";

const useSocketService = () => {
  const { socket, setSocket } = useMyContext();
  const { RoomCreated, RoomJoined, RecivedOffer } = useListenService();

  //to connect to socket
  const connectSocket = () => {
    if (socket) {
      console.log("Socket already connected");
      return;
    }

    const ws = new WebSocket("http://localhost:8080/ws");
    ws.onopen = () => {
      console.log("WebSocket is open now.");
      setSocket(ws);
    };

    ws.onmessage = (event) => {
      const evData: wsEvent = JSON.parse(event.data);

      switch (evData.event) {
        case "room:created":
          RoomCreated(evData.data);
          break;
        case "room:joined":
          RoomJoined(evData.data);
          break;
        case "error":
          toast.error(evData.data.msg as string);
          break;
        case "success":
          toast.success(evData.data.msg as string);
          break;
        case "recived:offer":
          RecivedOffer(evData.data);
          break;
      }
    };

    ws.onclose = () => {
      console.log("WebSocket is closed now.");
      setSocket(null);
    };

    ws.onerror = (error) => {
      console.error("WebSocket error observed:", error);
    };
  };

  //to emite events
  const wsEmitEv = (ev: wsEvent) => {
    if (!socket || socket.readyState !== WebSocket.OPEN) {
      toast.error("Socket not connected");
      return;
    }

    socket.send(JSON.stringify(ev));
  };

  return { connectSocket, wsEmitEv };
};

export default useSocketService;
