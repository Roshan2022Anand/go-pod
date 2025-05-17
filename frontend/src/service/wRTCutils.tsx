import { useWRTCContext } from "../providers/context/wRTC/config";

const useWRTCservice = () => {
  const { setPeerC } = useWRTCContext();
  //to send the offer to the connected clieant
  const initOffer = async (): Promise<RTCSessionDescriptionInit> => {
    const conn = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });
    setPeerC(conn);
    const offer = await conn.createOffer();
    await conn.setLocalDescription(offer);
    return offer;
  };

  return {
    initOffer,
  };
};

export default useWRTCservice;
