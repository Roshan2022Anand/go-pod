import { Button } from "@/components/ui/button";
import { generateStudioID } from "@/lib/utils";
import { useNavigate } from "@tanstack/react-router";
import { useSelector } from "react-redux";
import type { StateT } from "@/providers/redux/store";
import useAuth from "@/hooks/auth";
import Loading from "@/Loading";
import SideBar from "@/components/home/SideBar";
import { SiPodcastindex } from "react-icons/si";

const Home = () => {
  useAuth();
  const navigate = useNavigate();
  const { name, email } = useSelector((state: StateT) => state.user);

  if (!name || !email) return <Loading />;

  const handleStudioNav = () => {
    if (!email) return;
    const stdID = generateStudioID(email);
    navigate({ to: `/studio/${stdID}` });
  };

  return (
    <main className="flex h-screen">
      <SideBar />
      <section className="grow rounded-t-md bg-bg-prime mx-2 mt-2 p-2 flex flex-col">
        <header className="text-txt-sec text-center border-b-2 py-2">
          Experience the storm of knowledge by starting your
          <span className="text-accent font-bold"> podcast!</span>
        </header>
        <figure className="grow flex justify-center items-center">
          <Button
            variant={"action"}
            className="flex gap-1"
            onClick={handleStudioNav}
          >
            <SiPodcastindex className="icon-sm " />
            <span>Start</span>
          </Button>
        </figure>
      </section>
    </main>
  );
};

export default Home;
