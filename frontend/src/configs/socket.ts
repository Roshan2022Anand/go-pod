import { io, Socket } from "socket.io-client";

const connectSocket = (): Socket => {
  const socket = io("http://localhost:3000", {
    withCredentials: true,
  });

  return socket;
};

export default connectSocket;
