import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { AuthProvider } from "../contexts/AuthProvider";

const queryClient = new QueryClient();

function RootLayout() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Outlet />
        <TanStackRouterDevtools />
      </QueryClientProvider>
    </AuthProvider>
  );
}

export const Route = createRootRoute({ component: RootLayout });
