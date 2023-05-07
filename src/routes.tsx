import { createBrowserRouter } from "react-router-dom";

import Home from "pages/Home";
import About from "pages/About";
import ErrorPage from "pages/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/about",
    element: <About />,
    errorElement: <ErrorPage />,
  },
]);
