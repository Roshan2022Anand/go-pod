import { RouterProvider } from "@tanstack/react-router";
import router from "./lib/Routers.tsx";

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
