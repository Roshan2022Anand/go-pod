import type React from "react";
import { useState } from "react";
import type { Socket } from "socket.io-client";
import useWrtcService from "../../service/wRTC";
import { MyContext } from "./config";
import type { RemoteStreamT } from "../../utils/Type";

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [myStream, setMyStream] = useState<MediaStream | null>(null);
  const [remoteStreams, setRemoteStreams] = useState<RemoteStreamT>(new Map());

  console.log(remoteStreams);
  useWrtcService(socket, myStream, setRemoteStreams);

  return (
    <MyContext.Provider
      value={{
        socket,
        setSocket,
        myStream,
        setMyStream,
        remoteStreams,
        setRemoteStreams,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export default ContextProvider;
