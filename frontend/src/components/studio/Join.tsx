import { useRef } from "react";
import useWsEmitService from "../../service/wsEmits";
import { useWsContext } from "../../providers/context/socket/config";

const Join = () => {
  const { joinRoom, createRoom } = useWsEmitService();
  const { socket } = useWsContext();
  const input = useRef<HTMLInputElement>(null);
  const handleJoinRoom = () => {
    const val = input.current?.value;
    if (!val) return;
    joinRoom(socket, val);
  };

  return (
    <>
      <button
        onClick={() => {
          createRoom(socket);
        }}
      >
        Create{" "}
      </button>
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
