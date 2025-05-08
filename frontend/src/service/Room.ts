import { useContext, useEffect } from "react";
import { MyContext } from "../utils/Mycontext";

const useRoomService = () => {
  const { socket } = useContext(MyContext);

  useEffect(() => {}, [socket]);

  const createRoom = (roomName: string) => {
    if (socket) {
      socket.emit("createRoom", roomName);
    }
  };

  return {
    createRoom,
  };
};

export default useRoomService;
