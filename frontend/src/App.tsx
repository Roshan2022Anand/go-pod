import { RouterProvider } from "@tanstack/react-router";
import router from "./utils/Routers.tsx";
import useSocketService from "./service/socket/Config.tsx";

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const App = () => {
  const { connectSocket } = useSocketService();
  connectSocket();
  return <RouterProvider router={router} />;
};

export default App;
