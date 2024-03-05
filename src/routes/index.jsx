import { lazy } from "react";
import { Suspense } from "react";
import { Route, useRoutes } from "react-router";

const Home = lazy(() =>
  import("../pages/Home").then(({ Home }) => ({ default: Home }))
);

const Details = lazy(() =>
  import("../pages/Details").then(({ Details }) => ({ default: Details }))
);

export const Routes = () => {
  let element = useRoutes([
    {
      path: "",
      element: <Home />,
    },
    // { path: "*", element: <NotFound /> },
    {
      path: "/project/:id",
      element: <Details />,
    },
  ]);

  return <Suspense fallback="Loading">{element}</Suspense>;
};

