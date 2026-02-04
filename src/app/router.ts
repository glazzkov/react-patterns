import { createBrowserRouter } from "react-router";

import { AppLayout } from "./ui/AppLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: AppLayout,
  },
]);
