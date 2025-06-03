import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";

const Landing = () => {
  const navigate = useNavigate();
  return (
    <main>
      <h3>go to dashboard</h3>
      <Button
        variant={"action"}
        onClick={() => {
          navigate({ to: "/dashboard" });
        }}
      >
        Go to Dashboard
      </Button>
    </main>
  );
};

export default Landing;
