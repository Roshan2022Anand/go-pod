type WsVal = string | number | RTCSessionDescriptionInit;

export type WsData = Record<string, WsVal>;

export type wsEvent = {
  event: string;
  data: WsData;
};

export type RemoteStreamT = Map<string, MediaStream>;
export type PeersT = Map<string, RTCPeerConnection>;