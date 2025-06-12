type WsVal = string | number | RTCSessionDescriptionInit |RTCIceCandidate | null;

export type WsData = Record<string, WsVal>;

export type wsEvent = {
  event: string;
  data: WsData;
};

export type RemoteStreamT = Map<string, MediaStream>;