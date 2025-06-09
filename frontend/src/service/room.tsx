import { useDispatch, useSelector } from "react-redux";
import type { StateT } from "../providers/redux/store";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { setPodRole, setRoomId } from "../providers/redux/slice/room";
import { useNavigate } from "@tanstack/react-router";
import { useWsContext } from "@/providers/context/socket/config";
import type { WsData } from "@/lib/Type";

//handles all the room emit and listen event's
const useRoomService = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { email, name } = useSelector((state: StateT) => state.user);
  const { listeners, wsOn, wsOff, wsEmit, socket } = useWsContext();

  // to listen all the incomming room event's
  useEffect(() => {
    if (!socket) return;
    if (listeners.has("room:created")) return;

    wsOn("room:created", (roomID) => {
      toast.success("Pod created succefully");
      dispatch(setRoomId(roomID));
    });

    wsOn("room:joined", (roomID) => {
      toast.success("Pod created succefully");
      dispatch(setRoomId(roomID));
    });

    wsOn("room:checked", (exist) => {
      if (exist) {
        toast.success("you one step closer to join the pod");
        dispatch(setPodRole("guest"));
      } else {
        toast.error("invalid pod link");
        navigate({ to: "/" });
      }
    });

    return () => {
      wsOff("room:created");
      wsOff("room:joined");
      wsOff("room:checked");
    };
  }, [wsOn, wsOff, dispatch, navigate, socket, listeners]);

  //to emit create room
  const create = (studioID: string) => {
    if (!email || !name) return;
    const payload: WsData = {
      studioID,
      email,
      name,
    };
    wsEmit("create:room", payload);
  };

  //to emit join room
  const join = (roomID: string) => {
    if (!email || !name) return;
    const payload: WsData = {
      roomID,
      email,
      name,
    };
    wsEmit("join:room", payload);
  };

  //to emit check room
  const checkRoom = (roomID: string, studioID: string) => {
    const payload: WsData = {
      roomID,
      studioID,
    };
    wsEmit("check:room", payload);
  };

  return { create, join, checkRoom };
};

export default useRoomService;
