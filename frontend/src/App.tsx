import { RouterProvider } from "@tanstack/react-router";
import router from "./utils/Routers.tsx";
import { useSelector } from "react-redux";
import type { RootState } from "./providers/redux/store.ts";

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const App = () => {
  const { name, email } = useSelector((state: RootState) => state.user);
  return (
    <>
      <p className="text-right">
        {name} - {email}
      </p>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
