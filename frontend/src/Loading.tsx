import { BiLoader } from "react-icons/bi";

const Loading = () => {
  return (
    <main className="h-screen w-screen flex justify-center items-center">
      <h3>Loding.....</h3>
      <BiLoader className="icon-lg animate-spin text-blue-500" />
    </main>
  );
};

export default Loading;
