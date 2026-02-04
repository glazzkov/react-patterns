import { createBrowserRouter } from "react-router";

import { AdvancedFormPage } from "@/examples/advanced-form/AdvancedFormPage";
import { BasicFormPage } from "@/examples/basic-form/BasicFormPage";
import { CustomLayoutFormPage } from "@/examples/custom-layout-form/CustomLayoutFormPage";

import { AppLayout } from "./ui/AppLayout";
import { HomePage } from "./ui/HomePage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: AppLayout,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: "examples/basic-form",
        Component: BasicFormPage,
      },
      {
        path: "examples/custom-layout",
        Component: CustomLayoutFormPage,
      },
      {
        path: "examples/advanced-form",
        Component: AdvancedFormPage,
      },
    ],
  },
]);
