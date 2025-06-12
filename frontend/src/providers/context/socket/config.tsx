import type { wsEvent } from "@/lib/Type";
import {
  createContext,
  useContext,
  type Dispatch,
  type SetStateAction,
} from "react";

type contextT = {
  socket: WebSocket | null;
  setSocket: Dispatch<SetStateAction<WebSocket | null>>;
  WsEmit: (data: wsEvent) => void;
};

export const WsContext = createContext<contextT>({
  socket: null,
  setSocket: () => {},
  WsEmit: () => {},
});

export const useWsContext = () => {
  const context = useContext(WsContext);
  if (!context) {
    throw new Error("inter error");
  }
  return context;
};
