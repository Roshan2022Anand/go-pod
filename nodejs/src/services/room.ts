import { Socket } from "socket.io";
import { generateID } from "../utils/genrator";
import { WsRoom, WsToEmail } from "../config/socket";

//All events related to WS rooms
export const RoomEvents = (ws: Socket) => {
  //event to create a WS room in the server
  ws.on("create:room", ({ name, email }) => {
    const roomID = generateID(10);
    WsRoom.set(roomID, new Map([[email, { ws, name }]]));
    WsToEmail.set(ws, email);
    ws.join(roomID);
    ws.emit("room:created", { roomID });
  });

  //event to join the client to the give room
  ws.on("join:room", ({ roomID, name, email }) => {
    const room = WsRoom.get(roomID);
    if (!room) {
      ws.emit("error", { msg: "Room does not exist" });
      return;
    }

    room.set(email, { ws, name });
    WsToEmail.set(ws, email);
    ws.join(roomID);
    ws.emit("room:joined", { roomID });
    ws.to(roomID).emit("room:newclient", { name, email });
  });
};
