import { useSelector } from "react-redux";
import type { StateT } from "@/providers/redux/store";
import { IoChevronBack } from "react-icons/io5";
import useStudio from "@/hooks/studio";

export const StudioNav = () => {
  const { name } = useSelector((state: StateT) => state.user);
  const { leaveStudio } = useStudio();

  return (
    <nav className="flex">
      <button onClick={leaveStudio}>
        <IoChevronBack className="icon-md" />
      </button>
      <h3>{name}'s studio</h3>
    </nav>
  );
};
