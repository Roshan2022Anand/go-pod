import { useNavigate } from "@tanstack/react-router";
import useRoomService from "../service/Room";

const Room = () => {
  const navigate = useNavigate();

  const { createRoom } = useRoomService();

  return (
    <>
      <button onClick={createRoom}>Create </button>
      <button onClick={() => navigate({ to: "/" })}>Back</button>
    </>
  );
};

export default Room;
