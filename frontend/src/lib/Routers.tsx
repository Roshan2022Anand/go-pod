import {
  createRouter,
  createRoute,
  createRootRoute,
} from "@tanstack/react-router";
import Landing from "../pages/Landing";
import Studio from "@/pages/Studio";
import NotFound from "@/NotFound";
import Login from "@/pages/Login";
import Loading from "@/Loading";

const rootRoute = createRootRoute();

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => <Landing />,
  loader: Loading,
});

const roomRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/studio/$studioID",
  component: () => <Studio />,
  loader: Loading,
});

const loginRouter = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: () => <Login />,
});

const routeTree = rootRoute.addChildren([indexRoute, roomRoute, loginRouter]);
const router = createRouter({
  routeTree,
  defaultNotFoundComponent: NotFound,
});

export default router;
