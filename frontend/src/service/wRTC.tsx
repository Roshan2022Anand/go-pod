import {
  useCallback,
  useEffect,
  type Dispatch,
  type SetStateAction,
} from "react";
import { toast } from "react-toastify";
import { Socket } from "socket.io-client";
import { useSelector } from "react-redux";
import type { StateT } from "../providers/redux/store";
import type { PeersT, RemoteStreamT } from "../lib/Type";

//hold's all the connected wRTC peers instance
//used to access respective peers based on client's email
export const peers: PeersT = new Map();

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
const useWrtcService = (
  socket: Socket | null,
  myStream: MediaStream | null,
  setRemoteStreams: Dispatch<SetStateAction<RemoteStreamT>>
) => {
  const { roomID } = useSelector((state: StateT) => state.room);

  //handle RTCpeer events
  const setPeerEv = useCallback(
    (email: string, peer: RTCPeerConnection) => {
      if (!socket || !roomID) return;

      //to send ICE candiate infomation to the connected peer
      peer.onicecandidate = (e) => {
        socket.emit("ice:sent", {
          roomID,
          email,
          candidate: e.candidate,
        });
      };

      //to track media streams of the connected peer
      peer.ontrack = (e) => {
        const stream = e.streams[0];
        setRemoteStreams((prev) => {
          prev.set(email, stream);
          return new Map(prev);
        });
      };

      //to send user's media stream to the connected peer
      if (myStream) {
        myStream.getTracks().forEach((track) => {
          peer.addTrack(track, myStream);
        });
      }

      //to handle peer disconnection
      peer.onconnectionstatechange = () => {
        const state = peer.connectionState;
        if (state !== "disconnected") return;

        peer.close();
        peers.delete(email);
        setRemoteStreams((prev) => {
          prev.delete(email);
          return new Map(prev);
        });
        toast.error(`${email} disconnected from the room`);
      };
    },
    [setRemoteStreams, myStream, socket, roomID]
  );

  //to initialize wRTC connection offer to the joined client
  const initOffer = useCallback(
    async (email: string) => {
      if (!socket || !roomID) return;
      const peer = new RTCPeerConnection(rtcConfig);
      peers.set(email, peer);

      setPeerEv(email, peer); // trigger exchange events

      //create offer and send it to respective peer
      const sdp = await peer.createOffer();
      await peer.setLocalDescription(new RTCSessionDescription(sdp));
      socket.emit("sdp:sent", {
        roomID,
        email,
        sdp,
      });
    },
    [socket, roomID, setPeerEv]
  );

  //to handle offer and send answer
  const handleOffer = useCallback(
    async (email: string, offer: RTCSessionDescriptionInit) => {
      if (!socket || !roomID) return;

      const peer = new RTCPeerConnection(rtcConfig);
      peers.set(email, peer);

      setPeerEv(email, peer); //trigger exchange events

      await peer.setRemoteDescription(new RTCSessionDescription(offer));

      //creating answer and send it to respective peer
      const sdp = await peer.createAnswer();
      await peer.setLocalDescription(new RTCSessionDescription(sdp));
      socket.emit("sdp:sent", {
        roomID,
        email,
        sdp,
      });
    },
    [setPeerEv, socket, roomID]
  );

  //to handle incomming asnwer
  const handleAns = useCallback(
    async (email: string, ans: RTCSessionDescriptionInit) => {
      if (!socket) return;
      peers.get(email)?.setRemoteDescription(ans);
    },
    [socket]
  );

  //to listen for wRTC events
  useEffect(() => {
    if (!socket) return;
    if (socket.hasListeners("room:newclient")) return;

    //handle notify new client have joined the room
    socket.on("room:newclient", ({ email, name }) => {
      initOffer(email);
      toast.success(`${name}-${email} joined the room`);
    });

    //to handle incomming SDP information
    socket.on(
      "sdp:received",
      ({ email, sdp }: { email: string; sdp: RTCSessionDescriptionInit }) => {
        if (sdp.type === "offer") handleOffer(email, sdp);
        else handleAns(email, sdp);
      }
    );

    //to handle incomming IDE candidate information
    socket.on("ice:received", ({ email, candidate }) => {
      const peer = peers.get(email);
      if (!peer) {
        console.error(`No peer connection found for ${email}`);
        return;
      }

      if (candidate) peer.addIceCandidate(new RTCIceCandidate(candidate));
    });

    return () => {
      socket.off("room:newclient");
      socket.off("ice:received");
      socket.off("sdp:received");
    };
  }, [socket, initOffer, handleAns, handleOffer]);
};

export default useWrtcService;
