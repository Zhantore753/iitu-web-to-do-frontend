import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import useAuth from "../hooks/useAuth";

export const Route = createRootRoute({
  component: function RootComponent() {
    const { isAuthenticated, logout } = useAuth();

    return (
      <>
        <div className="bg-black px-4">
          <nav className="container md:mx-auto py-4 flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <Link to="/" className="font-bold text-white">
                TODO
              </Link>
              <Link
                to="/statistic"
                className="font-medium [&.active]:font-bold text-secondary [&.active]:text-primary"
              >
                Statistic
              </Link>
            </div>
            <div className="flex gap-2 items-center">
              {!isAuthenticated ? (
                <>
                  <Link
                    to="/login"
                    className="font-medium [&.active]:font-bold text-secondary [&.active]:text-primary"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="font-medium [&.active]:font-bold text-secondary [&.active]:text-primary"
                  >
                    Register
                  </Link>
                </>
              ) : (
                <button onClick={logout} className="font-medium text-secondary">
                  Logout
                </button>
              )}
            </div>
          </nav>
        </div>
        <hr />
        <Outlet />
        {process.env.NODE_ENV === "development" && (
          <>
            <TanStackRouterDevtools />
            <ReactQueryDevtools />
          </>
        )}
      </>
    );
  },
});
