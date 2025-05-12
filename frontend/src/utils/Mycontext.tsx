import { createContext, useContext } from "react";
import type { ContextType } from "./Types";

export const MyContext = createContext<ContextType>({
  connectSocket: () => {},
  sendMsg() {},
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
