import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { RouteSelection } from "./pages/RouteSelection";
import { RouteDetail } from "./pages/RouteDetail";
import { StopInfo } from "./pages/StopInfo";
import { Reports } from "./pages/Reports";
import { Ratings } from "./pages/Ratings";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/route-selection",
    Component: RouteSelection,
  },
  {
    path: "/route-detail/:routeId",
    Component: RouteDetail,
  },
  {
    path: "/stop/:stopId",
    Component: StopInfo,
  },
  {
    path: "/reports",
    Component: Reports,
  },
  {
    path: "/ratings",
    Component: Ratings,
  },
]);
