import { useEffect, useRef } from "react";
import useRoomService from "../../service/room";
import { useMyContext } from "../../providers/context/config";
import Player from "./Player";

const Join = () => {
  const { create, join } = useRoomService();
  const { setMyStream, myStream } = useMyContext();

  const input = useRef<HTMLInputElement>(null);
  const handleJoinRoom = () => {
    const val = input.current?.value;
    if (!val) return;
    join(val);
  };

  useEffect(() => {
    const getMedia = async () => {
      const media = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setMyStream(media);
    };
    getMedia();
  }, [setMyStream]);

  return (
    <>
      <Player stream={myStream} user="you" />
      <button onClick={create}>Create </button>
      <input
        ref={input}
        type="text"
        className="bg-blue-300 rounded-sm text-black outline-none p-1"
      />
      <button onClick={handleJoinRoom}>Join</button>
    </>
  );
};

export default Join;
