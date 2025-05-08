import { useState } from "react";
import { MyContext } from "./Mycontext";
import { Socket } from "socket.io-client";

export const ContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  return (
    <MyContext.Provider value={{ socket, setSocket }}>
      {children}
    </MyContext.Provider>
  );
};
