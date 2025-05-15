import { useNavigate } from "@tanstack/react-router";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <>
      <button
        className="text-[20px] rounded-md bg-green-300"
        onClick={() => navigate({ to: "/studio" })}
      >
        home
      </button>
    </>
  );
};

export default Landing;
