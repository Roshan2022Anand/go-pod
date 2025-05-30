import { Server as HttpServer } from "http";
import { Socket, Server as WsServer } from "socket.io";
import { RoomEvents } from "../services/room";
import { RoomT } from "../utils/types";
import { wRtcEvents } from "../services/wRTC";

//stores information of a Pod room
//like the connected users
export const WsRoom: RoomT = new Map();

//stores the socket and it's respective email
//to access the email through the client's socket
export const WsToEmail: Map<Socket, string> = new Map();

let io: WsServer;
export const initSocket = (server: HttpServer) => {
  io = new WsServer(server, {
    cors: {
      origin: process.env.FRONTEND_URL,
    },
  });

  io.on("connection", (socket) => {
    console.log("new connection", socket.id);
    // to set all the event's related to the socket server
    RoomEvents(socket);
    wRtcEvents(socket);

    socket.on("disconnect", () => {
      const email = WsToEmail.get(socket);
      if (email) {
        WsRoom.forEach((room, roomId) => {
          if (room.members.has(email)) room.members.delete(email);
          if (room.members.size == 0) WsRoom.delete(roomId);
        });
      }
      console.log("disconnected", socket.id);
    });
  });
};

// to get the instance of the WS server (IO)
export const GetIo = () => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
};
