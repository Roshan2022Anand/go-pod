import { useDispatch } from "react-redux";
import { setRoomId } from "../../providers/redux/slice/User";
import { toast } from "react-toastify";
import type { WsData } from "../../utils/Type";

const useListenService = () => {
  const dispatch = useDispatch();

  //handle room joined event
  const RoomJoined = (data: WsData) => {
    dispatch(setRoomId(data.roomId));
    toast.success("Successfully joined room");
  };

  //handle room created event
  const RoomCreated = (data: WsData) => {
    dispatch(setRoomId(data.roomId));
    toast.success("Successfully created room");
  };

  const RecivedOffer = (data: WsData) => {
    toast.success("Successfully received offer");
    console.log(data);
  };

  return {
    RoomJoined,
    RoomCreated,
    RecivedOffer,
  };
};

export default useListenService;
