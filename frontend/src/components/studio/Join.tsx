import { useRef } from "react";
import useRoomService from "../../service/socket/Room";

const Join = () => {
  const { createRoom, joinRoom } = useRoomService();

  const input = useRef<HTMLInputElement>(null);
  const handleJoinRoom = () => {
    const val = input.current?.value;
    if (!val) return;
    joinRoom(val);
  };

  return (
    <>
      <button onClick={createRoom}>Create </button>
      <input
        ref={input}
        type="text"
        className="bg-blue-300 rounded-sm text-black outline-none p-1"
      />
      <button onClick={handleJoinRoom}>Join</button>
    </>
  );
};

export default Join;
