import { createContext } from "react";
import type { ContextType } from "./Types";

export const MyContext = createContext<ContextType>({
  socket: null,
  setSocket: () => {},
});
