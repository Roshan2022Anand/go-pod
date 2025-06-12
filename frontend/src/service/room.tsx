import { useDispatch, useSelector } from "react-redux";
import type { StateT } from "../providers/redux/store";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { setPodRole, setRoomId } from "../providers/redux/slice/room";
import { useNavigate } from "@tanstack/react-router";
import { useWsContext } from "@/providers/context/socket/config";
import type { WsData, wsEvent } from "@/lib/Type";
import useWrtcService from "./wRTC";

//handles all the room emit and listen event's
const useRoomService = () => {
  //hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { socket, WsEmit } = useWsContext();
  const { initOffer } = useWrtcService();

  //redux state
  const { email, name } = useSelector((state: StateT) => state.user);

  useEffect(() => {
    if (!socket) return;

    const created = (data: WsData) => {
      const { roomID } = data;
      toast.success("Pod created succefully");
      dispatch(setRoomId(roomID));
    };

    const joined = (data: WsData) => {
      const { roomID } = data;
      toast.success("Pod joined successfully");
      dispatch(setRoomId(roomID));
    };

    const checked = (data: WsData) => {
      const { exist } = data;
      if (exist) {
        toast.success("you one step closer to join the pod");
        dispatch(setPodRole("guest"));
      } else {
        toast.error("invalid pod link");
        navigate({ to: "/" });
      }
    };

    const wsMsg = (event: MessageEvent) => {
      const ev: wsEvent = JSON.parse(event.data);
      switch (ev.event) {
        case "room:created":
          created(ev.data);
          break;
        case "room:joined":
          joined(ev.data);
          break;
        case "room:checked":
          checked(ev.data);
          break;
      }
    };

    socket.addEventListener("message", wsMsg);
    return () => {
      socket.removeEventListener("message", wsMsg);
    };
  }, [socket]);

  //to emit create room
  const create = (studioID: string) => {
    if (!email || !name) return;
    const payload: wsEvent = {
      event: "create:room",
      data: {
        studioID,
        email,
        name,
      },
    };
    WsEmit(payload);
    initOffer();
  };

  //to emit join room
  const join = (roomID: string) => {
    if (!email || !name) return;
    const payload: wsEvent = {
      event: "join:room",
      data: {
        roomID,
        email,
        name,
      },
    };
    WsEmit(payload);
  };

  //to emit check room
  const checkRoom = (roomID: string, studioID: string) => {
    const payload: wsEvent = {
      event: "check:room",
      data: {
        roomID,
        studioID,
      },
    };
    WsEmit(payload);
  };

  return { create, join, checkRoom };
};

export default useRoomService;
