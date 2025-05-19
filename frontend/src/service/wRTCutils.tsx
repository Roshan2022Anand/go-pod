import useWsEmitService from "./wsEmits";

const useWRTCservice = () => {
  const { sendOffer } = useWsEmitService();

  //to send the offer to the connected clieant
  const initOffer = async (ws: WebSocket | null, email: string) => {
    const conn = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });
    const offer = await conn.createOffer();
    await conn.setLocalDescription(offer);
    sendOffer(ws, offer, email);
  };

  return {
    initOffer,
  };
};

export default useWRTCservice;
