import {
  createRouter,
  createRoute,
  createRootRoute,
} from "@tanstack/react-router";
import Studio from "@/pages/Studio";
import NotFound from "@/NotFound";
import Login from "@/pages/Login";
import Loading from "@/Loading";
import Home from "../pages/Home";
import Landing from "@/pages/Landing";

const rootRoute = createRootRoute();

const langingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => <Landing />,
  loader: Loading,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: () => <Home />,
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

const routeTree = rootRoute.addChildren([
  langingRoute,
  homeRoute,
  roomRoute,
  loginRouter,
]);
const router = createRouter({
  routeTree,
  defaultNotFoundComponent: NotFound,
});

export default router;
