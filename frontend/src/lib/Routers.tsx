import {
  createRouter,
  createRoute,
  createRootRoute,
} from "@tanstack/react-router";
import Landing from "../pages/Landing";
import Studio from "@/pages/Studio";
import NotFound from "@/NotFound";

const rootRoute = createRootRoute();

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => <Landing />,
});

const roomRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/studio/$studioID",
  // loader: async ({ params }) => {
  //   const { studioID } = params;
  // },
  component: () => <Studio />,
});

const routeTree = rootRoute.addChildren([indexRoute, roomRoute]);
const router = createRouter({
  routeTree,
  defaultNotFoundComponent: NotFound,
});

export default router;
