import { useMyContext } from "./utils/context/Mycontext";
import { RouterProvider } from "@tanstack/react-router";
import router from "./utils/Routers.tsx";

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const App = () => {
  const { connectSocket } = useMyContext();
  connectSocket();
  return <RouterProvider router={router} />;
};

export default App;
