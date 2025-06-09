import type { WsData } from "@/lib/Type";
import {
  createContext,
  useContext,
  type Dispatch,
  type SetStateAction,
} from "react";

type contextT = {
  socket: WebSocket | null;
  setSocket: Dispatch<SetStateAction<WebSocket | null>>;
  wsOn: (event: string, callback: (...args: string[]) => void) => void;
  wsOff: (event: string) => void;
  wsEmit: (event: string, data: WsData) => void;
  listeners: Map<string, () => void>;
};

export const WsContext = createContext<contextT>({
  socket: null,
  setSocket: () => {},
  wsOn: () => {},
  wsOff: () => {},
  wsEmit: () => {},
  listeners: new Map(),
});

export const useWsContext = () => {
  const context = useContext(WsContext);
  if (!context) {
    throw new Error("inter error");
  }
  return context;
};
