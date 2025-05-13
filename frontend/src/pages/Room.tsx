import { useNavigate } from "@tanstack/react-router";
import useRoomService from "../service/Room";
import { useRef } from "react";

const Room = () => {
  const navigate = useNavigate();

  const { createRoom, joinRoom } = useRoomService();

  const inp = useRef<HTMLInputElement | null>(null);

  return (
    <>
      <button onClick={createRoom}>Create </button>

      <input type="text" className="bg-slate-600 rounded-md m-4" ref={inp} />
      <button
        onClick={() => {
          const val = inp.current?.value;
          if (!val || val == "") return;
          console.log("val", val);
          joinRoom(val);
        }}
      >
        Join
      </button>

      <button onClick={() => navigate({ to: "/" })}>Back</button>
    </>
  );
};

export default Room;
