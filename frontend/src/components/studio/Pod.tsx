import { useSelector } from "react-redux";
import type { RootState } from "../../providers/redux/store";

const Pod = () => {
  const { roomId } = useSelector((state: RootState) => state.user);
  return (
    <>
      <div className="text-[20px] text-green-400">{roomId}</div>
    </>
  );
};

export default Pod;
