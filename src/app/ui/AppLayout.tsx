import { FC } from "react";
import { Link, Outlet, useLocation } from "react-router";

import { cn } from "@/shared/utils/classNames";

const NAVIGATION_LINKS = [
  { path: "/", label: "Home" },
  { path: "/examples/basic-form", label: "Basic Form" },
  { path: "/examples/custom-layout", label: "Custom Layout" },
  { path: "/examples/advanced-form", label: "Advanced Form" },
];

export const AppLayout: FC = () => {
  const location = useLocation();

  return (
    <div className="flex min-h-screen min-w-5xl">
      <nav className="w-64 border-r bg-muted/40 p-6">
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Form Examples</h2>
        </div>
        <ul className="flex flex-col gap-1">
          {NAVIGATION_LINKS.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={cn(
                  "block rounded-md px-3 py-2 text-sm transition-colors",
                  "hover:bg-accent hover:text-accent-foreground",
                  location.pathname === link.path &&
                    "bg-accent text-accent-foreground font-medium",
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
};
