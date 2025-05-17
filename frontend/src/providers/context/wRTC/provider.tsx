import type React from "react";
import { WebRTCContext } from "./config";
import { useState } from "react";

const WRTCProvider = ({ children }: { children: React.ReactNode }) => {
  const [peerC, setPeerC] = useState<RTCPeerConnection | null>(null);

  return (
    <WebRTCContext.Provider value={{ peerC, setPeerC }}>
      {children}
    </WebRTCContext.Provider>
  );
};

export default WRTCProvider;
