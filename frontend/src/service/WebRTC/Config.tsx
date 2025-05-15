import { useSelector } from "react-redux";
import { useMyContext } from "../../providers/context/Socket";
import useSocketService from "../socket/Config";
import type { RootState } from "../../providers/redux/store";

const useWebRTCService = () => {
  const { setPeerConn, peerConn } = useMyContext();
  const { wsEmitEv } = useSocketService();
  const { roomId } = useSelector((state: RootState) => state.user);

  const config: RTCConfiguration = {
    iceServers: [
      {
        urls: [
          "stun:stun.l.google.com:19302",
          "stun:global.stun.twilio.com:3478",
        ],
      },
    ],
  };

  //to init the rtc
  const intiRTC = () => {
    const peerC = new RTCPeerConnection(config);
    setPeerConn(peerC);
  };

  //to send offer
  const sendOffer = async () => {
    if (!peerConn) return;

    const offer = await peerConn.createOffer();
    await peerConn.setLocalDescription(offer);

    wsEmitEv({
      event: "send:offer",
      data: {
        offer: offer,
        roomId: roomId!,
      },
    });
  };

  return { intiRTC, sendOffer };
};

export default useWebRTCService;
