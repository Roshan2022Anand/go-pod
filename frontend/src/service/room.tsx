import { useDispatch, useSelector } from "react-redux";
import type { StateT } from "../providers/redux/store";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { setPodRole, setRoomId } from "../providers/redux/slice/room";
import { useMyContext } from "../providers/context/config";
import { useNavigate } from "@tanstack/react-router";

//handles all the room emit and listen event's
const useRoomService = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { socket } = useMyContext();
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

    socket.on("room:checked", ({ exist }) => {
      if (exist) {
        toast.success("you one step closer to join the pod");
        dispatch(setPodRole("guest"));
      } else {
        toast.error("invalid pod link");
        navigate({ to: "/" });
      }
    });

    return () => {
      socket.off("room:created");
      socket.off("room:joined");
      socket.off("room:checked");
    };
  }, [socket, dispatch, navigate]);

  //to emit create room
  const create = (studioID: string) => {
    if (!socket) return;
    socket.emit("create:room", { studioID, email, name });
  };

  //to emit join room
  const join = (roomID: string) => {
    if (!socket) return;
    socket.emit("join:room", { roomID, email, name });
  };

  //to emit check room
  const checkRoom = (roomID: string, studioID: string) => {
    if (!socket) return;
    socket.emit("check:room", { roomID, studioID });
  };

  return { create, join, checkRoom };
};

export default useRoomService;
