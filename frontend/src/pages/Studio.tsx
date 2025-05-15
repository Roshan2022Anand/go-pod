import { useNavigate } from "@tanstack/react-router";
import Join from "../components/studio/Join";
import { useSelector } from "react-redux";
import type { RootState } from "../providers/redux/store";
import Pod from "../components/studio/Pod";

const Room = () => {
  const navigate = useNavigate();

  const { roomId } = useSelector((state: RootState) => state.user);
  return (
    <>
      <button onClick={() => navigate({ to: "/" })}>Back</button>
      {roomId ? <Pod /> : <Join />}
    </>
  );
};

export default Room;

// https://riverside.fm/studio/roshan-anands-studio-NT4ri?t=df3e553361086a5ce319
// https://riverside.fm/studio/roshan-anands-studio-NT4ri
