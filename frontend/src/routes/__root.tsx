// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import type { AuthContextType } from "../contexts/AuthContext";

// const queryClient = new QueryClient();

type MyRouterContext = {
  auth: AuthContextType;
};

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    // <QueryClientProvider client={queryClient}>
    <>
      <Outlet />
      <TanStackRouterDevtools />
    </>
    // </QueryClientProvider>
  ),
});
