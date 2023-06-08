import { createBrowserRouter } from "react-router-dom";

import ErrorPage from "pages/ErrorPage";
import Layout from "pages/Layout";
import PlatformLaunch from "pages/PlatformLaunch";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "kanban/:kanbanId",
        element: <PlatformLaunch />,
      },
    ],
  },
]);
