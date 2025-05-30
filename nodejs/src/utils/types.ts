import { Socket } from "socket.io";

type UserT = {
  name: string;
  ws: Socket;
};

type RoomMembersT = Map<string, UserT>;

export type RoomT = Map<string, { studioID: string; members: RoomMembersT }>;
