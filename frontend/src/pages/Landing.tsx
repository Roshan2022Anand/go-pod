import { Button } from "@/components/ui/button";
import { generateStudioID } from "@/lib/genrator";
import { useNavigate } from "@tanstack/react-router";
import { useSelector } from "react-redux";
import type { StateT } from "@/providers/redux/store";

const Landing = () => {
  const navigate = useNavigate();
  const { name, email } = useSelector((state: StateT) => state.user);

  const handleStudioNav = () => {
    const stdID = generateStudioID(email);
    navigate({ to: `/studio/${stdID}` });
  };
  return (
    <>
      <h3>
        {name} - {email}
      </h3>
      <Button className="bg-green-400" onClick={handleStudioNav}>
        studio
      </Button>
    </>
  );
};

export default Landing;
