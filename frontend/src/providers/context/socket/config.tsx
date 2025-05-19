import {
  createContext,
  useContext,
  type Dispatch,
  type SetStateAction,
  // type Dispatch,
  // type SetStateAction,
} from "react";

type contextT = {
  socket: WebSocket | null;
  setSocket: Dispatch<SetStateAction<WebSocket | null>>;
};

export const SocketContext = createContext<contextT>({
  socket: null,
  setSocket: () => {},
});

export const useWsContext = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("inter error");
  }
  return context;
};
