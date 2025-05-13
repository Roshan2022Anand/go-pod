import { createContext, useContext } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { wsEvent } from "../Type";

interface ContextType {
  connectSocket: () => void;
  wsEmitEv: (ev: wsEvent) => void;
  socket: WebSocket | null;
  setSocket: Dispatch<SetStateAction<WebSocket | null>>;
  isSocketReady: boolean;
  setIsSocketReady: Dispatch<SetStateAction<boolean>>;
}

export const MyContext = createContext<ContextType>({
  connectSocket: () => {},
  wsEmitEv() {},
  socket: null,
  setSocket: () => {},
  isSocketReady: false,
  setIsSocketReady: () => {},
});

export const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error("useMyContext must be used within a MyContextProvider");
  }
  return context;
};
