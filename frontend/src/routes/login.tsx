import { createFileRoute, redirect } from "@tanstack/react-router";
import { Login } from "../pages/login/Login";

export const Route = createFileRoute("/login")({
  beforeLoad: ({ context }) => {
    // Redirect if already authenticated
    if (context.auth.user) {
      throw redirect({ to: "/" });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <Login />;
}
