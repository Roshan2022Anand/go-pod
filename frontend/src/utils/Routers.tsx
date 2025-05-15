import {
  createRouter,
  createRoute,
  createRootRoute,
} from "@tanstack/react-router";
import Room from "../pages/Studio";
import Landing from "../pages/Landing";

const rootRoute = createRootRoute();

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => <Landing />,
});

const roomRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/studio",
  component: () => <Room />,
});

const routeTree = rootRoute.addChildren([indexRoute, roomRoute]);
const router = createRouter({ routeTree });

export default router;
