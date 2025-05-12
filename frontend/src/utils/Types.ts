import type { Dispatch, SetStateAction } from "react";
export interface ContextType {
  connectSocket: () => void;
  sendMsg: () => void;
  socket: WebSocket | null;
  setSocket: Dispatch<SetStateAction<WebSocket | null>>;
  isSocketReady: boolean;
  setIsSocketReady: Dispatch<SetStateAction<boolean>>;
}
