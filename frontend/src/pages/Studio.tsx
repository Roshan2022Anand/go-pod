import Join from "../components/studio/Join";
import { useSelector } from "react-redux";
import Pod from "../components/studio/Pod";
import type { StateT } from "../providers/redux/store";
import useAuth from "@/hooks/auth";
import Loading from "@/Loading";
import { StudioNav } from "@/components/studio/Nav";
import { useWsContext } from "@/providers/context/socket/config";

const Studio = () => {
  useAuth();

  const { socket } = useWsContext();
  const { roomID } = useSelector((state: StateT) => state.room);
  const { name, email } = useSelector((state: StateT) => state.user);

  if (!name || !email) return <Loading />;

  return (
    <main className="bg-bg-prime h-screen flex flex-col">
      <StudioNav />
      {socket?.readyState === WebSocket.OPEN ? (
        <>{roomID ? <Pod /> : <Join />}</>
      ) : (
        <h3 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          Cooking your connection...
        </h3>
      )}
    </main>
  );
};

export default Studio;
