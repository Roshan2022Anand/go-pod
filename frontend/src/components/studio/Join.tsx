import { useEffect } from "react";
import useRoomService from "../../service/room";
import { useMyContext } from "../../providers/context/config";
import Player from "./Player";
import { Button } from "../ui/button";
import { ControlerCamera, ControlerMic } from "./MediaUtils";
import { useNavigate, useParams, useSearch } from "@tanstack/react-router";
import { CheckStudioID } from "@/lib/genrator";
import { setPodRole, setStudioId } from "@/providers/redux/slice/room";
import { useDispatch, useSelector } from "react-redux";
import type { StateT } from "@/providers/redux/store";
const Join = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { create, join, checkRoom } = useRoomService();
  const { setMyStream, myStream } = useMyContext();
  const { email, name } = useSelector((state: StateT) => state.user);
  const { role } = useSelector((state: StateT) => state.room);

  //to validate client's authorization in the pod
  const { studioID } = useParams({ from: "/studio/$studioID" });
  const { rID } = useSearch({ from: "/studio/$studioID" }) as { rID: string };
  useEffect(() => {
    if (CheckStudioID(studioID, email)) {
      dispatch(setStudioId(studioID));
      dispatch(setPodRole("host"));
    } else if (rID) checkRoom(rID, studioID);
    else navigate({ to: "/" });
  }, [studioID, checkRoom, email, dispatch, navigate, rID]);

  //to access user's media stream
  const getMedia = async () => {
    const media = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    setMyStream(media);
  };

  return (
    <section className="grow flex justify-around items-center">
      {role ? (
        <>
          <figure className="flex flex-col gap-3">
            <p>your about to join the pod</p>
            <p className="flex justify-around items-center py-1 bg-blue-200 rounded-md text-black">
              {name}{" "}
              <span className="bg-blue-400 py-1 px-3 rounded-md">{role}</span>
            </p>
            <Button onClick={getMedia}>Allow access</Button>
            {myStream && (
              <Button
                onClick={() => {
                  if (role == "host") create(studioID);
                  else join(rID);
                }}
              >
                {role == "host" ? "create " : "join "} pod
              </Button>
            )}
          </figure>
          <figure>
            {myStream ? (
              <div className="bg-black rounded-md p-2">
                <Player stream={myStream} user="you" />
                <div className="flex justify-around">
                  <ControlerMic stream={myStream} className="" />
                  <ControlerCamera stream={myStream} className="" />
                </div>
              </div>
            ) : (
              <p>camera setup</p>
            )}
          </figure>
        </>
      ) : (
        <h3>cokking your connection...</h3>
      )}
    </section>
  );
};

export default Join;
