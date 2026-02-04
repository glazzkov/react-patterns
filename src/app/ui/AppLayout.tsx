import { FC } from "react";
import { Outlet } from "react-router";

export const AppLayout: FC = () => {
  return (
    <main>
      <Outlet />
    </main>
  );
};
