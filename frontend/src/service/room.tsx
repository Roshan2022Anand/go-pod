import { useDispatch, useSelector } from "react-redux";
import type { StateT } from "../providers/redux/store";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { setRoomId } from "../providers/redux/slice/room";
import { useMyContext } from "../providers/context/config";

//handles all the room emit and listen event's
const useRoomService = () => {
  const { socket } = useMyContext();
  const dispatch = useDispatch();
  const { email, name } = useSelector((state: StateT) => state.user);

  // to listen all the incomming room event's
  useEffect(() => {
    if (!socket) return;
    if (socket.hasListeners("room:created")) return;

    socket.on("room:created", ({ roomID }) => {
      toast.success("Pod created succefully");
      dispatch(setRoomId(roomID));
    });

    socket.on("room:joined", ({ roomID }) => {
      toast.success("Pod created succefully");
      dispatch(setRoomId(roomID));
    });

    return () => {
      socket.off("room:created");
      socket.off("room:joined");
    };
  }, [socket, dispatch]);

  //to emit create room
  const create = () => {
    if (!socket) return;
    socket.emit("create:room", { email, name });
  };

  //to emit join room
  const join = (roomID: string) => {
    if (!socket) return;
    socket.emit("join:room", { roomID, email, name });
  };

  return { create, join };
};

export default useRoomService;
