import {
  createContext,
  useContext,
  type Dispatch,
  type SetStateAction,
  // type Dispatch,
  // type SetStateAction,
} from "react";
import type { wsEvent } from "../../../utils/Type";

type contextT = {
  socket: WebSocket | null;
  wsEmit: (data: wsEvent) => void;
  setSocket: Dispatch<SetStateAction<WebSocket | null>>;
};

export const SocketContext = createContext<contextT>({
  socket: null,
  wsEmit: () => {},
  setSocket: () => {},
});

export const useWsContext = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("inter error");
  }
  return context;
};
