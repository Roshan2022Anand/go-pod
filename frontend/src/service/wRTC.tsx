import { useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import { useWsContext } from "@/providers/context/socket/config";
import { useWrtcContext } from "@/providers/context/wRTC/config";
import type { WsData, wsEvent } from "@/lib/Type";
import { compressSdp, decompressSdp } from "@/lib/utils";

//wRTC server configuration
const rtcConfig = {
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
    },
  ],
  iceCandidatePoolSize: 10,
};

//handles all the wRTC emit and listen event's
const useWrtcService = () => {
  const { socket, WsEmit } = useWsContext();
  const { myStream } = useWrtcContext();
  const { peerC, setPeerC } = useWrtcContext();

  //handle RTCpeer events
  const setPeerEv = useCallback(
    (peer: RTCPeerConnection) => {
      if (!socket) return;

      //to send ICE candiate infomation to the connected peer
      peer.onicecandidate = (e) => {
        const candidate = e.candidate?.candidate;
        if (!candidate) return;

        WsEmit({
          event: "ice",
          data: {
            ice: candidate,
          },
        });
      };

      //to track media streams of the connected peer
      //   peer.ontrack = (e) => {
      //     const stream = e.streams[0];
      //     setRemoteStreams((prev) => {
      //       prev.set(email, stream);
      //       return new Map(prev);
      //     });
      //   };

      //to send user's media stream to the connected peer
      if (myStream) {
        myStream.getTracks().forEach((track) => {
          console.log("sending track");
          peer.addTrack(track, myStream);
        });
      }

      //to handle peer disconnection
      peer.onconnectionstatechange = () => {
        const state = peer.connectionState;
        if (state !== "disconnected") return;

        peer.close();
        setPeerC(null);
        // setRemoteStreams((prev) => {
        //   prev.delete(email);
        //   return new Map(prev);
        // });
        toast.error(` disconnected from the room`);
      };
    },
    [myStream, socket, WsEmit, setPeerC]
  );

  //to initialize wRTC connection offer to the joined client
  const initOffer = async () => {
    if (!socket) return;
    const peer = new RTCPeerConnection(rtcConfig);
    setPeerEv(peer);

    //create offer and send it to the server
    const sdp = await peer.createOffer();
    await peer.setLocalDescription(new RTCSessionDescription(sdp));
    setPeerC(peer);
    const zipSdp = compressSdp(sdp.sdp as string); //compressed to reduce bandwidth usage
    WsEmit({
      event: "sdp:offer",
      data: {
        sdp: zipSdp,
      },
    });
  };

  //to listen for wRTC events
  useEffect(() => {
    if (!socket || !peerC) return;

    //to handle incomming SDP information
    const handleSdp = async (data: WsData) => {
      if (!peerC) return;
      const sdp = decompressSdp(data.sdp as string);
      await peerC.setRemoteDescription(
        new RTCSessionDescription({
          type: "answer",
          sdp: sdp,
        })
      );
    };

    //to handle incomming ICE candidate information
    const handleIce = (data: WsData) => {
      const candidate = data.candidate as RTCIceCandidateInit;
      if (!peerC) {
        console.error(`No peer connection found`);
        return;
      }

      if (candidate) peerC.addIceCandidate(new RTCIceCandidate(candidate));
    };

    const wsMsg = (event: MessageEvent) => {
      const ev: wsEvent = JSON.parse(event.data);
      switch (ev.event) {
        case "sdp:answer":
          handleSdp(ev.data);
          break;
        case "ice":
          handleIce(ev.data);
          break;
      }
    };

    socket.addEventListener("message", wsMsg);
    return () => {
      socket.removeEventListener("message", wsMsg);
    };
  }, [socket, peerC]);

  return { initOffer };
};

export default useWrtcService;
