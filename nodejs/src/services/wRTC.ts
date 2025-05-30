import { Socket } from "socket.io";
import { WsRoom, WsToEmail } from "../config/socket";

//All the events related to wRTC connection is here
export const wRtcEvents = (ws: Socket) => {
  //event to send the incomming SDP to respective client
  ws.on("sdp:sent", ({ roomID, email, sdp }) => {
    const socket = WsRoom.get(roomID)?.members.get(email)?.ws;
    if (!socket) {
      ws.emit("error", { msg: email + " is not in the pod" });
      return;
    }

    const to = WsToEmail.get(ws);
    socket.emit("sdp:received", { email: to, sdp });
  });

  //event to send the incomming ICE candiate info to respective client
  ws.on("ice:sent", ({ roomID, email, candidate }) => {
    const socket = WsRoom.get(roomID)?.members.get(email)?.ws;
    if (!socket) {
      ws.emit("error", { msg: email + " is not in the pod" });
      return;
    }

    const to = WsToEmail.get(ws);
    socket.emit("ice:received", { email: to, candidate });
  });
};
