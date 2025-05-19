import { useSelector } from "react-redux";
import useWsEmitService from "./wsEmits";
import type { RootState } from "../providers/redux/store";
import type { peerSdpT, wsEvent } from "../utils/Type";

export const peerSdp: peerSdpT = new Map();

const rtcConfig = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" },
    { urls: "stun:stun1.l.google.com:19302" },
    { urls: "stun:stun2.l.google.com:19302" },
    { urls: "stun:stun3.l.google.com:19302" },
  ],
};

const useWRTCservice = () => {
  const { wsEmit } = useWsEmitService();
  const { roomId } = useSelector((state: RootState) => state.user);

  //to send the offer to the connected clieant
  const initOffer = async (ws: WebSocket | null, email: string) => {
    const peerC = new RTCPeerConnection(rtcConfig);
    const offer = await peerC.createOffer();
    await peerC.setLocalDescription(offer);
    peerSdp.set(email, peerC);

    const payload: wsEvent = {
      event: "send:offer",
      data: {
        roomID: roomId!,
        offer: JSON.stringify(offer),
        to: email,
      },
    };
    wsEmit(ws, payload);
  };

  //to send the answer
  const initAns = async (
    ws: WebSocket | null,
    offer: RTCSessionDescriptionInit,
    email: string
  ) => {
    const peerC = new RTCPeerConnection(rtcConfig);
    await peerC.setRemoteDescription(offer);
    const ans = await peerC.createAnswer();
    await peerC.setLocalDescription(ans);
    peerSdp.set(email, peerC);

    const payload: wsEvent = {
      event: "send:answer",
      data: {
        roomID: roomId!,
        answer: JSON.stringify(ans),
        to: email,
      },
    };
    wsEmit(ws, payload);
  };

  const setRemoteAns = async (
    ans: RTCSessionDescriptionInit,
    email: string
  ) => {
    const peerC = peerSdp.get(email);
    if (!peerC) {
      console.error("Peer connection :", email);
      return;
    }
    await peerC.setRemoteDescription(ans);
  };

  return {
    initOffer,
    initAns,
    setRemoteAns,
  };
};

export default useWRTCservice;
