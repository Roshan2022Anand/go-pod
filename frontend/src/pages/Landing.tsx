import { useNavigate } from "@tanstack/react-router";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <>
      <button
        className="text-[20px] rounded-md bg-green-300"
        onClick={() => navigate({ to: "/room" })}
      >
        create room
      </button>
    </>
  );
};

export default Landing;
