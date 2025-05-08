import type { Socket } from "socket.io-client";

export interface ContextType {
  socket: Socket | null;
  setSocket: (socket: Socket | null) => void;
}
