import { createBrowserRouter } from "react-router-dom";

import ErrorPage from "pages/ErrorPage";
import Layout from "pages/Layout";
import PlatformLaunch from "pages/PlatformLaunch";
import MarketingPlan from "pages/MarketingPlan";
import Roadmap from "pages/Roadmap";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "platform-launch",
        element: <PlatformLaunch />,
      },
      {
        path: "marketing-plan",
        element: <MarketingPlan />,
      },
      {
        path: "roadmap",
        element: <Roadmap />,
      },
    ],
  },
]);
