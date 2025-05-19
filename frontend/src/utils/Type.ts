type WsVal = string | number | RTCSessionDescriptionInit;

export type WsData = Record<string, WsVal>;

export type wsEvent = {
  event: string;
  data: WsData;
};

export type peerSdpT = Map<string, RTCPeerConnection>;